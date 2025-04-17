export function formatDisplayLabel(category: string, label: string): string {
  if (!category.includes("Cam")) return label;

  let position = "";
  if (label.includes("Left")) position = "Left";
  else if (label.includes("Center")) position = "Center";
  else if (label.includes("Right")) position = "Right";

  let axis = "";
  if (label.includes("X")) axis = "X";
  else if (label.includes("Y")) axis = "Y";

  return `${position} ${axis}`;
}
