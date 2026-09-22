import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import {
  RNMediapipe,
  switchCamera
} from "@thinksys/react-native-mediapipe";
import { useCallback, useRef, useState } from "react";
import { extractLandmarks } from "./src/utils/pose";
import { Landmark, TrackingStatus } from "./src/types/pose";
import { SquatState, updateSquat } from "./src/exercises/squat";

const { width, height } = Dimensions.get("window");

export default function App() {
  const [landmarks, setLandmarks] = useState<Landmark[]>([]);
  const [status, setStatus] = useState<TrackingStatus>("searching");
  const [repetitions, setRepetitions] = useState(0);
  const [squatState, setSquatState] =
    useState<SquatState>("standing");
  const [kneeAngle, setKneeAngle] = useState<number | null>(null);

  const squatStateRef = useRef<SquatState>("standing");
  const repetitionsRef = useRef(0);

  const handleLandmark = useCallback((data: unknown) => {
    const nextLandmarks = extractLandmarks(data);

    if (nextLandmarks.length === 0) {
      setStatus("searching");
      return;
    }

    setLandmarks(nextLandmarks);
    setStatus("tracking");

    const result = updateSquat(
      nextLandmarks,
      squatStateRef.current,
      repetitionsRef.current
    );

    squatStateRef.current = result.state;
    repetitionsRef.current = result.repetitions;

    setSquatState(result.state);
    setRepetitions(result.repetitions);

    if (typeof result.kneeAngle === "number") {
      setKneeAngle(result.kneeAngle);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <RNMediapipe
        width={width}
        height={height}
        onLandmark={handleLandmark}
        face={true}
        leftArm={true}
        rightArm={true}
        leftWrist={true}
        rightWrist={true}
        torso={true}
        leftLeg={true}
        rightLeg={true}
        leftAnkle={true}
        rightAnkle={true}
        frameLimit={25}
      />

      <View pointerEvents="none" style={styles.topPanel}>
        <Text style={styles.title}>Motion Fitness Tracker</Text>
        <Text style={styles.status}>
          {status === "tracking"
            ? `Tracking ${landmarks.length} body points`
            : "Looking for a person..."}
        </Text>

        <View style={styles.statsRow}>
          <View>
            <Text style={styles.statLabel}>SQUATS</Text>
            <Text style={styles.statValue}>{repetitions}</Text>
          </View>

          <View>
            <Text style={styles.statLabel}>KNEE ANGLE</Text>
            <Text style={styles.statValue}>
              {kneeAngle === null
                ? "--"
                : `${Math.round(kneeAngle)}°`}
            </Text>
          </View>
        </View>
      </View>

      <View pointerEvents="none" style={styles.stateBadge}>
        <Text style={styles.stateText}>
          {squatState.toUpperCase()}
        </Text>
      </View>

      <View style={styles.bottomPanel}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={switchCamera}
          style={styles.flipButton}
        >
          <Text style={styles.flipText}>Flip Camera</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000"
  },
  topPanel: {
    position: "absolute",
    top: 48,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "rgba(0, 0, 0, 0.68)"
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700"
  },
  status: {
    color: "#ddd",
    marginTop: 6,
    fontSize: 14
  },
  statsRow: {
    flexDirection: "row",
    gap: 36,
    marginTop: 14
  },
  statLabel: {
    color: "#aaa",
    fontSize: 11,
    fontWeight: "700"
  },
  statValue: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    marginTop: 2
  },
  stateBadge: {
    position: "absolute",
    top: 235,
    alignSelf: "center",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.68)"
  },
  stateText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700"
  },
  bottomPanel: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 35,
    alignItems: "center"
  },
  flipButton: {
    minWidth: 160,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 28,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  flipText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "700"
  }
});