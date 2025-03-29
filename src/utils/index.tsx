/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...classes: ClassValue[]) => twMerge(clsx(classes));

export function persistValue(key: string, value: any) {
  const stringifiedValue = JSON.stringify(value);
  localStorage.setItem(key, stringifiedValue);
}

export function clearValue(key: string) {
  localStorage.removeItem(key);
}

export function clearStorage() {
  localStorage.clear();
}

export function retrieveValue(key: string): any {
  try {
    return JSON.parse(localStorage.getItem(key) || "");
  } catch {
    return null;
  }
}

export function updateObjectWithArray(originalObject, objectsArray) {
  // Find the object in the array that matches the original object's id
  const matchingObject = objectsArray.find(
    (obj) => obj.id === originalObject.id,
  );

  // If a match is found, return the matching object; otherwise, return the original
  return matchingObject ? matchingObject : originalObject;
}

export function updateObjectInArray(originalObject, objectsArray) {
  // Use map to create a new array with the updated object
  return objectsArray.map((obj) => {
    // If the object's id matches the original object's id, return the updated object
    if (obj.id === originalObject.id) {
      return { ...obj, ...originalObject }; // Merge properties to update
    }
    return obj; // Otherwise, return the original object from the array
  });
}
