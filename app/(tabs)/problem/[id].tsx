import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { AlertCircle, AlertTriangle, Info, ChevronRight } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Colors from "@/constants/colors";
import { NONWOVEN_PROBLEMS, CATEGORY_COLORS, SEVERITY_COLORS } from "@/constants/nonwoven-data";

export default function ProblemDetailScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  
  const problem = NONWOVEN_PROBLEMS.find((p) => p.id === id);

  if (!problem) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Problem Not Found" }} />
        <View style={styles.errorState}>
          <AlertCircle size={48} color={Colors.light.secondaryText} />
          <Text style={styles.errorText}>Problem not found</Text>
        </View>
      </View>
    );
  }

  const getSeverityIcon = () => {
    const iconSize = 20;
    const color = SEVERITY_COLORS[problem.severity];
    
    switch (problem.severity) {
      case "high":
        return <AlertCircle size={iconSize} color={color} />;
      case "medium":
        return <AlertTriangle size={iconSize} color={color} />;
      case "low":
        return <Info size={iconSize} color={color} />;
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: problem.title,
          headerStyle: {
            backgroundColor: Colors.light.card,
          },
          headerTintColor: Colors.light.text,
        }} 
      />
      
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.headerSection}>
          <View style={styles.badges}>
            <View
              style={[
                styles.categoryBadge,
                { backgroundColor: CATEGORY_COLORS[problem.category] },
              ]}
            >
              <Text style={styles.categoryBadgeText}>{problem.category}</Text>
            </View>
            
            <View style={styles.severityBadge}>
              {getSeverityIcon()}
              <Text
                style={[
                  styles.severityBadgeText,
                  { color: SEVERITY_COLORS[problem.severity] },
                ]}
              >
                {problem.severity.toUpperCase()} SEVERITY
              </Text>
            </View>
          </View>

          <Text style={styles.title}>{problem.title}</Text>
          <Text style={styles.description}>{problem.description}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Issue Details</Text>
          </View>
          
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <View style={[styles.tableHeaderCell, styles.tableHeaderLeft]}>
                <AlertCircle size={18} color="#FFFFFF" />
                <Text style={styles.tableHeaderText}>Causes</Text>
              </View>
              <View style={[styles.tableHeaderCell, styles.tableHeaderRight]}>
                <ChevronRight size={18} color="#FFFFFF" />
                <Text style={styles.tableHeaderText}>Corrections</Text>
              </View>
            </View>

            {problem.causes.map((cause, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text style={styles.tableCellNumber}>{index + 1}</Text>
                  <Text style={styles.tableCellText}>{cause}</Text>
                </View>
                <View style={styles.tableCellDivider} />
                <View style={styles.tableCell}>
                  <Text style={[styles.tableCellNumber, { color: Colors.light.success }]}>
                    {index + 1}
                  </Text>
                  <Text style={styles.tableCellText}>
                    {problem.solutions[index] || "See general solutions"}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.infoBox}>
          <Info size={20} color={Colors.light.tint} />
          <Text style={styles.infoText}>
            These are common causes and solutions. Always consult with your technical team and 
            follow your facility&apos;s specific procedures and safety guidelines.
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
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    gap: 20,
  },
  errorState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  errorText: {
    fontSize: 16,
    color: Colors.light.secondaryText,
  },
  headerSection: {
    backgroundColor: Colors.light.card,
    padding: 20,
    borderRadius: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  badges: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  categoryBadgeText: {
    fontSize: 13,
    fontWeight: "700" as const,
    color: "#FFFFFF",
  },
  severityBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: Colors.light.background,
    borderRadius: 6,
  },
  severityBadgeText: {
    fontSize: 12,
    fontWeight: "700" as const,
  },
  title: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: Colors.light.text,
    lineHeight: 32,
  },
  description: {
    fontSize: 16,
    color: Colors.light.secondaryText,
    lineHeight: 24,
  },
  section: {
    gap: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  sectionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: Colors.light.text,
    flex: 1,
  },
  tableContainer: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: Colors.light.tint,
  },
  tableHeaderCell: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    gap: 6,
  },
  tableHeaderLeft: {
    borderRightWidth: 1,
    borderRightColor: "#FFFFFF30",
  },
  tableHeaderRight: {
    borderLeftWidth: 1,
    borderLeftColor: "#FFFFFF30",
  },
  tableHeaderText: {
    fontSize: 15,
    fontWeight: "700" as const,
    color: "#FFFFFF",
  },
  tableRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    minHeight: 60,
  },
  tableCell: {
    flex: 1,
    padding: 12,
    gap: 6,
  },
  tableCellDivider: {
    width: 1,
    backgroundColor: Colors.light.border,
  },
  tableCellNumber: {
    fontSize: 12,
    fontWeight: "700" as const,
    color: Colors.light.error,
  },
  tableCellText: {
    fontSize: 13,
    color: Colors.light.text,
    lineHeight: 18,
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
