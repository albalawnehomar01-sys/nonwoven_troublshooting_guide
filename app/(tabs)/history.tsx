import { Stack } from "expo-router";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { History as HistoryIcon, Calendar, TrendingUp } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Colors from "@/constants/colors";

interface HistoryEvent {
  year: string;
  title: string;
  description: string;
  highlight?: boolean;
}

const HISTORY_TIMELINE: HistoryEvent[] = [
  {
    year: "1930s",
    title: "Birth of Nonwovens",
    description: "The nonwoven industry began in the 1930s with the development of early bonding techniques for textile fibers.",
  },
  {
    year: "1942",
    title: "First Patent",
    description: "The first patent for nonwoven fabrics was granted, marking the official beginning of the industry.",
    highlight: true,
  },
  {
    year: "1950s",
    title: "Commercial Production",
    description: "Mass production of nonwovens began with the introduction of chemical bonding and needle-punching technologies.",
  },
  {
    year: "1960s",
    title: "Spunbond Technology",
    description: "Development of spunbond technology revolutionized the industry, enabling continuous production of nonwoven fabrics directly from polymer.",
    highlight: true,
  },
  {
    year: "1970s",
    title: "Meltblown Process",
    description: "Meltblown technology was developed, creating ultra-fine fibers perfect for filtration and barrier applications.",
    highlight: true,
  },
  {
    year: "1980s",
    title: "SMS Technology",
    description: "Spunbond-Meltblown-Spunbond (SMS) composite fabrics combined the benefits of both technologies, expanding application possibilities.",
  },
  {
    year: "1990s",
    title: "Market Expansion",
    description: "Nonwovens gained widespread acceptance in hygiene products, medical applications, and geotextiles. Global production capacity grew exponentially.",
  },
  {
    year: "2000s",
    title: "Sustainability Focus",
    description: "The industry shifted focus toward sustainable materials, biodegradable nonwovens, and eco-friendly production processes.",
  },
  {
    year: "2010s",
    title: "Advanced Materials",
    description: "Development of nanofiber technology and smart textiles opened new frontiers in filtration, protective wear, and medical applications.",
  },
  {
    year: "2020+",
    title: "Innovation Era",
    description: "COVID-19 pandemic highlighted critical importance of nonwovens in PPE. Industry focuses on automation, digitalization, and circular economy principles.",
    highlight: true,
  },
];

const KEY_FACTS = [
  {
    icon: TrendingUp,
    title: "Market Growth",
    value: "8.5%",
    description: "Average annual growth rate",
  },
  {
    icon: Calendar,
    title: "Industry Age",
    value: "90+ years",
    description: "Of continuous innovation",
  },
  {
    icon: HistoryIcon,
    title: "Global Production",
    value: "12M+ tons",
    description: "Produced annually worldwide",
  },
];

export default function HistoryScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Stack.Screen 
        options={{ 
          title: "History",
          headerStyle: {
            backgroundColor: Colors.light.card,
          },
          headerTintColor: Colors.light.text,
        }} 
      />
      
      <View style={styles.header}>
        <HistoryIcon size={28} color={Colors.light.tint} />
        <Text style={styles.headerTitle}>History of Nonwovens</Text>
        <Text style={styles.headerSubtitle}>
          From humble beginnings to modern innovation
        </Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.factsContainer}>
          {KEY_FACTS.map((fact, index) => {
            const IconComponent = fact.icon;
            return (
              <View key={index} style={styles.factCard}>
                <IconComponent size={24} color={Colors.light.tint} />
                <Text style={styles.factValue}>{fact.value}</Text>
                <Text style={styles.factTitle}>{fact.title}</Text>
                <Text style={styles.factDescription}>{fact.description}</Text>
              </View>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Historical Timeline</Text>

        <View style={styles.timeline}>
          {HISTORY_TIMELINE.map((event, index) => (
            <View key={index} style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <View style={[
                  styles.timelineDot,
                  event.highlight && styles.timelineDotHighlight,
                ]} />
                {index < HISTORY_TIMELINE.length - 1 && (
                  <View style={styles.timelineLine} />
                )}
              </View>
              
              <View style={[
                styles.timelineCard,
                event.highlight && styles.timelineCardHighlight,
              ]}>
                <Text style={[
                  styles.timelineYear,
                  event.highlight && styles.timelineYearHighlight,
                ]}>
                  {event.year}
                </Text>
                <Text style={styles.timelineTitle}>{event.title}</Text>
                <Text style={styles.timelineDescription}>{event.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.infoBox}>
          <HistoryIcon size={20} color={Colors.light.tint} />
          <Text style={styles.infoText}>
            Today, nonwovens are produced using various technologies including spunbond, 
            meltblown, needle-punch, spunlace, and chemical bonding, each optimized for 
            specific applications and performance requirements.
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
    gap: 20,
  },
  factsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  factCard: {
    flex: 1,
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  factValue: {
    fontSize: 24,
    fontWeight: "800" as const,
    color: Colors.light.tint,
  },
  factTitle: {
    fontSize: 12,
    fontWeight: "600" as const,
    color: Colors.light.text,
    textAlign: "center",
  },
  factDescription: {
    fontSize: 10,
    color: Colors.light.secondaryText,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: Colors.light.text,
    marginBottom: 8,
  },
  timeline: {
    gap: 0,
  },
  timelineItem: {
    flexDirection: "row",
    gap: 12,
  },
  timelineLeft: {
    alignItems: "center",
    paddingTop: 8,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.light.border,
    borderWidth: 3,
    borderColor: Colors.light.background,
  },
  timelineDotHighlight: {
    backgroundColor: Colors.light.tint,
    borderColor: Colors.light.tint + "30",
    borderWidth: 4,
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: Colors.light.border,
    marginTop: 4,
    minHeight: 40,
  },
  timelineCard: {
    flex: 1,
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  timelineCardHighlight: {
    borderColor: Colors.light.tint,
    borderWidth: 2,
  },
  timelineYear: {
    fontSize: 14,
    fontWeight: "700" as const,
    color: Colors.light.tint,
  },
  timelineYearHighlight: {
    fontSize: 15,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: Colors.light.text,
  },
  timelineDescription: {
    fontSize: 14,
    color: Colors.light.secondaryText,
    lineHeight: 20,
  },
  infoBox: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: Colors.light.tint + "10",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.tint + "30",
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: Colors.light.secondaryText,
    lineHeight: 20,
  },
});
