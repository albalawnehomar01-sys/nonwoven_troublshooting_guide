import { router } from "expo-router";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Factory, BookOpen, History, ArrowRight } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#1e3a8a", "#3b82f6", "#60a5fa"]}
        style={[styles.gradient, { paddingTop: insets.top + 20, paddingBottom: insets.bottom }]}
      >
        <View style={styles.header}>
          <Factory size={64} color="#FFFFFF" />
          <Text style={styles.title}>Welcome to{"\n"}Nonwoven World</Text>
          <Text style={styles.subtitle}>
            Your comprehensive guide to nonwoven manufacturing troubleshooting,
            applications, and history
          </Text>
        </View>

        <View style={styles.cardsContainer}>
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => router.push("/(tabs)/troubleshooting")}
          >
            <LinearGradient
              colors={["#ffffff", "#f0f9ff"]}
              style={styles.cardGradient}
            >
              <View style={styles.cardIconContainer}>
                <Factory size={32} color="#3b82f6" />
              </View>
              <Text style={styles.cardTitle}>Troubleshooting</Text>
              <Text style={styles.cardDescription}>
                Find solutions for Spunbond and Meltblown process issues
              </Text>
              <View style={styles.cardArrow}>
                <ArrowRight size={20} color="#3b82f6" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => router.push("/(tabs)/applications")}
          >
            <LinearGradient
              colors={["#ffffff", "#f0fdf4"]}
              style={styles.cardGradient}
            >
              <View style={[styles.cardIconContainer, { backgroundColor: "#10b98120" }]}>
                <BookOpen size={32} color="#10b981" />
              </View>
              <Text style={styles.cardTitle}>Applications</Text>
              <Text style={styles.cardDescription}>
                Explore various uses and industries for nonwoven fabrics
              </Text>
              <View style={styles.cardArrow}>
                <ArrowRight size={20} color="#10b981" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => router.push("/(tabs)/history")}
          >
            <LinearGradient
              colors={["#ffffff", "#fef3f2"]}
              style={styles.cardGradient}
            >
              <View style={[styles.cardIconContainer, { backgroundColor: "#f5960920" }]}>
                <History size={32} color="#f59e0b" />
              </View>
              <Text style={styles.cardTitle}>History</Text>
              <Text style={styles.cardDescription}>
                Learn about the evolution of nonwoven technology
              </Text>
              <View style={styles.cardArrow}>
                <ArrowRight size={20} color="#f59e0b" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Reifenhäuser Reicofil Process Training
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: "800" as const,
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 20,
    lineHeight: 44,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#e0f2fe",
    textAlign: "center",
    marginTop: 16,
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  cardsContainer: {
    gap: 16,
    flex: 1,
  },
  card: {
    borderRadius: 20,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  cardGradient: {
    padding: 20,
    minHeight: 140,
  },
  cardIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#3b82f620",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "700" as const,
    color: "#1e293b",
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 20,
    flex: 1,
  },
  cardArrow: {
    alignSelf: "flex-end",
    marginTop: 8,
  },
  footer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#bfdbfe",
    textAlign: "center",
  },
});
