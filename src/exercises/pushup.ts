import { Landmark } from "../types/pose";
import { angle } from "../utils/pose";

export type PushupState = "up" | "descending" | "bottom" | "ascending";

const LEFT_SHOULDER = 11;
const LEFT_ELBOW = 13;
const LEFT_WRIST = 15;
const RIGHT_SHOULDER = 12;
const RIGHT_ELBOW = 14;
const RIGHT_WRIST = 16;

export function updatePushup(
  landmarks: Landmark[],
  previousState: PushupState,
  repetitions: number
) {
  if (landmarks.length <= RIGHT_WRIST) {
    return { state: previousState, repetitions };
  }

  const left = angle(landmarks[LEFT_SHOULDER], landmarks[LEFT_ELBOW], landmarks[LEFT_WRIST]);
  const right = angle(landmarks[RIGHT_SHOULDER], landmarks[RIGHT_ELBOW], landmarks[RIGHT_WRIST]);
  const elbowAngle = (left + right) / 2;

  let state = previousState;
  if (elbowAngle > 155) state = "up";
  else if (elbowAngle > 105) state = "descending";
  else if (elbowAngle < 95) state = "bottom";
  else if (elbowAngle < 135) state = "ascending";

  const next = previousState === "bottom" && state === "up" ? repetitions + 1 : repetitions;
  return { state, repetitions: next, primaryAngle: elbowAngle };
}
