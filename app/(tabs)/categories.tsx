import { Stack } from "expo-router";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { FolderKanban } from "lucide-react-native";

import Colors from "@/constants/colors";
import { CATEGORIES, CATEGORY_COLORS, NONWOVEN_PROBLEMS, ProblemCategory } from "@/constants/nonwoven-data";
import { useMemo } from "react";

export default function CategoriesScreen() {
  const categoryStats = useMemo(() => {
    const stats: Record<ProblemCategory, number> = {
      "Web Formation": 0,
      "Bonding": 0,
      "Finishing": 0,
      "Equipment": 0,
      "Quality": 0,
    };
    
    NONWOVEN_PROBLEMS.forEach((problem) => {
      stats[problem.category]++;
    });
    
    return stats;
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: "Categories",
          headerStyle: {
            backgroundColor: Colors.light.card,
          },
          headerTintColor: Colors.light.text,
        }} 
      />
      
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <FolderKanban size={32} color={Colors.light.tint} />
          <Text style={styles.headerTitle}>Problem Categories</Text>
          <Text style={styles.headerSubtitle}>
            Browse common nonwoven manufacturing issues organized by category
          </Text>
        </View>

        <View style={styles.categoryList}>
          {CATEGORIES.map((category) => (
            <View key={category} style={styles.categoryCard}>
              <View style={styles.categoryCardHeader}>
                <View
                  style={[
                    styles.categoryIcon,
                    { backgroundColor: CATEGORY_COLORS[category] },
                  ]}
                >
                  <FolderKanban size={24} color="#FFFFFF" />
                </View>
                <Text style={styles.categoryTitle}>{category}</Text>
              </View>
              
              <Text style={styles.categoryCount}>
                {categoryStats[category]} {categoryStats[category] === 1 ? "problem" : "problems"}
              </Text>
              
              <View style={styles.problemsList}>
                {NONWOVEN_PROBLEMS.filter(p => p.category === category).map((problem) => (
                  <View key={problem.id} style={styles.problemItem}>
                    <View style={styles.problemBullet} />
                    <Text style={styles.problemItemText} numberOfLines={1}>
                      {problem.title}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Total: {NONWOVEN_PROBLEMS.length} problems across {CATEGORIES.length} categories
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
  header: {
    backgroundColor: Colors.light.card,
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: Colors.light.text,
    marginTop: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.light.secondaryText,
    textAlign: "center",
    lineHeight: 20,
  },
  categoryList: {
    gap: 12,
  },
  categoryCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  categoryCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: Colors.light.text,
    flex: 1,
  },
  categoryCount: {
    fontSize: 14,
    color: Colors.light.secondaryText,
    fontWeight: "600" as const,
  },
  problemsList: {
    gap: 8,
    marginTop: 4,
  },
  problemItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  problemBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.light.tint,
  },
  problemItemText: {
    fontSize: 14,
    color: Colors.light.text,
    flex: 1,
  },
  footer: {
    backgroundColor: Colors.light.card,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  footerText: {
    fontSize: 14,
    color: Colors.light.secondaryText,
    fontWeight: "600" as const,
  },
});
