import { Link, Stack } from "expo-router";
import { useState, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Factory, AlertCircle, AlertTriangle, Info } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Colors from "@/constants/colors";
import {
  NONWOVEN_PROBLEMS,
  SEVERITY_COLORS,
  ProcessType,
} from "@/constants/nonwoven-data";

export default function TroubleshootingScreen() {
  const insets = useSafeAreaInsets();
  const [selectedProcess, setSelectedProcess] = useState<ProcessType>("Spunbond");

  const filteredProblems = useMemo(() => {
    return NONWOVEN_PROBLEMS.filter((problem) => problem.processType === selectedProcess);
  }, [selectedProcess]);

  const getSeverityIcon = (severity: "high" | "medium" | "low") => {
    const iconSize = 16;
    const color = SEVERITY_COLORS[severity];
    
    switch (severity) {
      case "high":
        return <AlertCircle size={iconSize} color={color} />;
      case "medium":
        return <AlertTriangle size={iconSize} color={color} />;
      case "low":
        return <Info size={iconSize} color={color} />;
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Stack.Screen 
        options={{ 
          title: "Troubleshooting",
          headerStyle: {
            backgroundColor: Colors.light.card,
          },
          headerTintColor: Colors.light.text,
        }} 
      />
      
      <View style={styles.header}>
        <Factory size={28} color={Colors.light.tint} />
        <Text style={styles.headerTitle}>Process Troubleshooting</Text>
        <Text style={styles.headerSubtitle}>
          Select a process to view common issues and solutions
        </Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedProcess === "Spunbond" && styles.tabActive,
          ]}
          onPress={() => setSelectedProcess("Spunbond")}
        >
          <Text
            style={[
              styles.tabText,
              selectedProcess === "Spunbond" && styles.tabTextActive,
            ]}
          >
            Spunbond
          </Text>
          <View style={[
            styles.tabBadge,
            selectedProcess === "Spunbond" && styles.tabBadgeActive,
          ]}>
            <Text style={[
              styles.tabBadgeText,
              selectedProcess === "Spunbond" && styles.tabBadgeTextActive,
            ]}>
              {NONWOVEN_PROBLEMS.filter(p => p.processType === "Spunbond").length}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            selectedProcess === "Meltblown" && styles.tabActive,
          ]}
          onPress={() => setSelectedProcess("Meltblown")}
        >
          <Text
            style={[
              styles.tabText,
              selectedProcess === "Meltblown" && styles.tabTextActive,
            ]}
          >
            Meltblown
          </Text>
          <View style={[
            styles.tabBadge,
            selectedProcess === "Meltblown" && styles.tabBadgeActive,
          ]}>
            <Text style={[
              styles.tabBadgeText,
              selectedProcess === "Meltblown" && styles.tabBadgeTextActive,
            ]}>
              {NONWOVEN_PROBLEMS.filter(p => p.processType === "Meltblown").length}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.problemList} contentContainerStyle={styles.problemListContent}>
        <Text style={styles.resultCount}>
          {filteredProblems.length} {filteredProblems.length === 1 ? "issue" : "issues"} found
        </Text>
        
        {filteredProblems.map((problem) => (
          <Link
            key={problem.id}
            href={{
              pathname: "/(tabs)/problem/[id]",
              params: { id: problem.id },
            }}
            asChild
          >
            <TouchableOpacity style={styles.problemCard}>
              <View style={styles.problemHeader}>
                <View style={styles.severityBadge}>
                  {getSeverityIcon(problem.severity)}
                  <Text
                    style={[
                      styles.severityBadgeText,
                      { color: SEVERITY_COLORS[problem.severity] },
                    ]}
                  >
                    {problem.severity.toUpperCase()}
                  </Text>
                </View>
              </View>
              
              <Text style={styles.problemTitle}>{problem.title}</Text>
              <Text style={styles.problemDescription} numberOfLines={2}>
                {problem.description}
              </Text>
              
              <View style={styles.problemFooter}>
                <Text style={styles.problemFooterText}>
                  {problem.causes.length} causes • {problem.solutions.length} solutions
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
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
  tabContainer: {
    flexDirection: "row",
    backgroundColor: Colors.light.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 12,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: Colors.light.background,
    gap: 8,
  },
  tabActive: {
    backgroundColor: Colors.light.tint,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: Colors.light.text,
  },
  tabTextActive: {
    color: "#FFFFFF",
  },
  tabBadge: {
    backgroundColor: Colors.light.border,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    minWidth: 24,
    alignItems: "center",
  },
  tabBadgeActive: {
    backgroundColor: "#FFFFFF30",
  },
  tabBadgeText: {
    fontSize: 12,
    fontWeight: "700" as const,
    color: Colors.light.text,
  },
  tabBadgeTextActive: {
    color: "#FFFFFF",
  },
  problemList: {
    flex: 1,
  },
  problemListContent: {
    padding: 16,
    gap: 12,
  },
  resultCount: {
    fontSize: 14,
    color: Colors.light.secondaryText,
    marginBottom: 4,
  },
  problemCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  problemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  severityBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  severityBadgeText: {
    fontSize: 12,
    fontWeight: "600" as const,
  },
  problemTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.light.text,
  },
  problemDescription: {
    fontSize: 14,
    color: Colors.light.secondaryText,
    lineHeight: 20,
  },
  problemFooter: {
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    paddingTop: 12,
  },
  problemFooterText: {
    fontSize: 13,
    color: Colors.light.secondaryText,
    fontWeight: "500" as const,
  },
});
