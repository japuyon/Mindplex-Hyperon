// Coordinate transformation utilities for canvas visualization
import { Point } from '../types';

export interface Transform {
  x: number;
  y: number;
  scale: number;
}

// Transform screen coordinates to world coordinates
export const screenToWorld = (screenPoint: Point, transform: Transform): Point => {
  return {
    x: (screenPoint.x - transform.x) / transform.scale,
    y: (screenPoint.y - transform.y) / transform.scale
  };
};

// Transform world coordinates to screen coordinates
export const worldToScreen = (worldPoint: Point, transform: Transform): Point => {
  return {
    x: worldPoint.x * transform.scale + transform.x,
    y: worldPoint.y * transform.scale + transform.y
  };
};

// Get mouse position relative to canvas
export const getMousePos = (e: MouseEvent, canvasRef: HTMLCanvasElement | undefined): Point => {
  if (!canvasRef) return { x: 0, y: 0 };
  const rect = canvasRef.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
};

// Check if a point is within canvas bounds (with margin)
export const isPointInCanvasBounds = (
  screenPos: Point, 
  canvasRef: HTMLCanvasElement | undefined, 
  margin: number = 50
): boolean => {
  if (!canvasRef) return false;
  return !(screenPos.x < -margin || screenPos.x > canvasRef.width + margin ||
           screenPos.y < -margin || screenPos.y > canvasRef.height + margin);
};