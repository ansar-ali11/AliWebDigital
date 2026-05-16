import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "./firebase";

export type BannerDoc = {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  imageUrl?: string;
  imagePath?: string;
  gradient?: string;
  createdAt?: number;
};

export type ProjectDoc = {
  id: string;
  title: string;
  description: string;
  category: string;
  year: string;
  liveUrl: string;
  tech: string[];
  imageUrl?: string;
  imagePath?: string;
  gradient?: string;
  createdAt?: number;
};

export type SubmissionDoc = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  message: string;
  createdAt?: number;
};

const bannersCol = () => collection(db, "banners");
const projectsCol = () => collection(db, "projects");
const submissionsCol = () => collection(db, "submissions");

export async function listBanners(): Promise<BannerDoc[]> {
  const snap = await getDocs(query(bannersCol(), orderBy("createdAt", "desc")));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<BannerDoc, "id">) }));
}
export async function listProjects(): Promise<ProjectDoc[]> {
  const snap = await getDocs(query(projectsCol(), orderBy("createdAt", "desc")));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ProjectDoc, "id">) }));
}
export async function listSubmissions(): Promise<SubmissionDoc[]> {
  const snap = await getDocs(query(submissionsCol(), orderBy("createdAt", "desc")));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<SubmissionDoc, "id">) }));
}

export async function uploadImage(folder: string, file: File) {
  const path = `${folder}/${Date.now()}-${file.name.replace(/[^\w.\-]+/g, "_")}`;
  const r = ref(storage, path);
  await uploadBytes(r, file);
  const url = await getDownloadURL(r);
  return { url, path };
}

/**
 * Compress an image entirely in the browser and return a base64 data URL
 * small enough to be stored directly in a Firestore document (<1MB doc limit).
 * Iteratively shrinks dimensions / JPEG quality until under `maxBytes`.
 */
export async function compressImageToBase64(
  file: File,
  opts: { maxBytes?: number; maxDimension?: number; mimeType?: string } = {}
): Promise<string> {
  const maxBytes = opts.maxBytes ?? 900_000; // ~900KB to stay under Firestore 1MB doc cap
  const mimeType = opts.mimeType ?? "image/jpeg";
  let maxDim = opts.maxDimension ?? 1600;

  const dataUrl = await new Promise<string>((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result as string);
    fr.onerror = () => reject(fr.error);
    fr.readAsDataURL(file);
  });

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const i = new Image();
    i.onload = () => resolve(i);
    i.onerror = reject;
    i.src = dataUrl;
  });

  let quality = 0.82;
  // Try progressively smaller versions until size fits
  for (let attempt = 0; attempt < 8; attempt++) {
    const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
    const w = Math.round(img.width * scale);
    const h = Math.round(img.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0, w, h);
    const out = canvas.toDataURL(mimeType, quality);
    // Rough byte size of base64 string
    const bytes = Math.ceil((out.length - out.indexOf(",") - 1) * 0.75);
    if (bytes <= maxBytes) return out;
    if (quality > 0.5) quality -= 0.1;
    else maxDim = Math.round(maxDim * 0.8);
  }
  throw new Error("Image too large — please choose a smaller image.");
}

export async function removeImage(path?: string) {
  if (!path) return;
  try {
    await deleteObject(ref(storage, path));
  } catch {
    /* ignore */
  }
}

export async function createBanner(data: Omit<BannerDoc, "id" | "createdAt">) {
  await addDoc(bannersCol(), { ...data, createdAt: Date.now(), ts: serverTimestamp() });
}
export async function updateBanner(id: string, data: Partial<BannerDoc>) {
  await updateDoc(doc(db, "banners", id), data);
}
export async function deleteBanner(b: BannerDoc) {
  await removeImage(b.imagePath);
  await deleteDoc(doc(db, "banners", b.id));
}

export async function createProject(data: Omit<ProjectDoc, "id" | "createdAt">) {
  await addDoc(projectsCol(), { ...data, createdAt: Date.now(), ts: serverTimestamp() });
}
export async function updateProject(id: string, data: Partial<ProjectDoc>) {
  await updateDoc(doc(db, "projects", id), data);
}
export async function deleteProject(p: ProjectDoc) {
  await removeImage(p.imagePath);
  await deleteDoc(doc(db, "projects", p.id));
}

export async function submitInquiry(data: Omit<SubmissionDoc, "id" | "createdAt">) {
  await addDoc(submissionsCol(), { ...data, createdAt: Date.now(), ts: serverTimestamp() });
}

export async function deleteSubmission(id: string) {
  await deleteDoc(doc(db, "submissions", id));
}
