import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { AlertCircle } from "lucide-react-native";

import Colors from "@/constants/colors";

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Not Found" }} />
      <AlertCircle size={64} color={Colors.light.secondaryText} />
      <Text style={styles.title}>Page not found</Text>
      <Link href="/" style={styles.link}>
        <Text style={styles.linkText}>Go to home screen</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: Colors.light.background,
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600" as const,
    color: Colors.light.text,
  },
  link: {
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: Colors.light.tint,
    borderRadius: 8,
  },
  linkText: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#FFFFFF",
  },
});
