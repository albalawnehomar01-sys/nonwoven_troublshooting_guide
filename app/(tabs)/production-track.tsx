import { Stack } from "expo-router";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import {
  ClipboardCheck,
  Settings,
  Thermometer,
  Layers,
  Gauge,
  ShieldCheck,
} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Colors from "@/constants/colors";

const TRACK_SECTIONS = [
  {
    title: "Line Setup",
    icon: Settings,
    color: Colors.light.tint,
    description:
      "Confirm raw material, equipment readiness, and recipe selection before start-up.",
    steps: [
      "Verify polymer grade, moisture, and additive targets",
      "Check spinneret condition, filters, and air systems",
      "Load correct recipe and save baseline parameters",
    ],
  },
  {
    title: "Process Stability",
    icon: Thermometer,
    color: "#F97316",
    description:
      "Keep thermal balance and airflow consistent to protect fiber quality.",
    steps: [
      "Monitor melt temperature profile and pressure trends",
      "Stabilize quench air velocity and temperature",
      "Review attenuation and air knife settings hourly",
    ],
  },
  {
    title: "Web Formation",
    icon: Layers,
    color: "#0EA5E9",
    description:
      "Maintain uniform laydown and basis weight to avoid streaks and holes.",
    steps: [
      "Check web uniformity maps and edge trimming",
      "Track basis weight variance and CV% targets",
      "Document corrective actions for thin or thick spots",
    ],
  },
  {
    title: "Bonding & Winding",
    icon: Gauge,
    color: "#10B981",
    description:
      "Set bonding windows and winding tension to preserve strength and roll quality.",
    steps: [
      "Confirm calender temperature, pressure, and pattern",
      "Inspect roll hardness and winding alignment",
      "Record roll defects and perform sample pulls",
    ],
  },
  {
    title: "Quality & Safety",
    icon: ShieldCheck,
    color: "#6366F1",
    description:
      "Capture KPIs and safety checks to keep the line compliant and predictable.",
    steps: [
      "Run hourly checks for tensile, opacity, and thickness",
      "Review scrap rate, downtime, and yield metrics",
      "Complete safety walk and lockout verifications",
    ],
  },
];

export default function ProductionTrackScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Stack.Screen
        options={{
          title: "Production Track",
          headerStyle: {
            backgroundColor: Colors.light.card,
          },
          headerTintColor: Colors.light.text,
        }}
      />

      <View style={styles.header}>
        <ClipboardCheck size={28} color={Colors.light.tint} />
        <Text style={styles.headerTitle}>Production Track</Text>
        <Text style={styles.headerSubtitle}>
          A step-by-step guide for consistent nonwoven output
        </Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {TRACK_SECTIONS.map((section) => {
          const IconComponent = section.icon;
          return (
            <View key={section.title} style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <View style={[styles.iconBadge, { backgroundColor: section.color + "20" }]}>
                  <IconComponent size={24} color={section.color} />
                </View>
                <View style={styles.sectionHeaderText}>
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                  <Text style={styles.sectionDescription}>{section.description}</Text>
                </View>
              </View>

              <View style={styles.stepList}>
                {section.steps.map((step) => (
                  <View key={step} style={styles.stepItem}>
                    <View style={[styles.stepBullet, { backgroundColor: section.color }]} />
                    <Text style={styles.stepText}>{step}</Text>
                  </View>
                ))}
              </View>
            </View>
          );
        })}

        <View style={styles.footerCard}>
          <Text style={styles.footerTitle}>Daily Production Scorecard</Text>
          <Text style={styles.footerText}>
            Target ≥ 98% uptime, ≤ 2% scrap, and zero safety deviations. Capture
            KPIs each shift and review during handoff.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    backgroundColor: Colors.light.card,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: Colors.light.text,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.light.secondaryText,
    textAlign: "center",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    gap: 16,
  },
  sectionCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    padding: 20,
    gap: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  sectionHeader: {
    flexDirection: "row",
    gap: 12,
  },
  iconBadge: {
    width: 50,
    height: 50,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionHeaderText: {
    flex: 1,
    gap: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.light.text,
  },
  sectionDescription: {
    fontSize: 14,
    color: Colors.light.secondaryText,
    lineHeight: 20,
  },
  stepList: {
    gap: 10,
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  stepBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: Colors.light.text,
    lineHeight: 20,
  },
  footerCard: {
    backgroundColor: Colors.light.tint + "10",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.light.tint + "30",
    gap: 8,
  },
  footerTitle: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: Colors.light.text,
  },
  footerText: {
    fontSize: 14,
    color: Colors.light.secondaryText,
    lineHeight: 20,
  },
});
