import { Link, Stack } from "expo-router";
import { useState, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Search, AlertCircle, AlertTriangle, Info } from "lucide-react-native";

import Colors from "@/constants/colors";
import {
  NONWOVEN_PROBLEMS,
  CATEGORIES,
  CATEGORY_COLORS,
  SEVERITY_COLORS,
  ProblemCategory,
} from "@/constants/nonwoven-data";

export default function TroubleshootingScreen() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<ProblemCategory | "All">("All");

  const filteredProblems = useMemo(() => {
    return NONWOVEN_PROBLEMS.filter((problem) => {
      const matchesSearch =
        searchQuery === "" ||
        problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || problem.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

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
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: "Troubleshooting",
          headerStyle: {
            backgroundColor: Colors.light.card,
          },
          headerTintColor: Colors.light.text,
        }} 
      />
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <Search size={20} color={Colors.light.secondaryText} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search problems..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.light.secondaryText}
          />
        </View>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryScrollContent}
      >
        <TouchableOpacity
          style={[
            styles.categoryChip,
            selectedCategory === "All" && styles.categoryChipActive,
          ]}
          onPress={() => setSelectedCategory("All")}
        >
          <Text
            style={[
              styles.categoryChipText,
              selectedCategory === "All" && styles.categoryChipTextActive,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryChip,
              selectedCategory === category && styles.categoryChipActive,
              selectedCategory === category && {
                backgroundColor: CATEGORY_COLORS[category],
              },
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryChipText,
                selectedCategory === category && styles.categoryChipTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.problemList} contentContainerStyle={styles.problemListContent}>
        <Text style={styles.resultCount}>
          {filteredProblems.length} {filteredProblems.length === 1 ? "problem" : "problems"} found
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
                <View style={styles.problemHeaderLeft}>
                  <View
                    style={[
                      styles.categoryBadge,
                      { backgroundColor: CATEGORY_COLORS[problem.category] + "20" },
                    ]}
                  >
                    <Text
                      style={[
                        styles.categoryBadgeText,
                        { color: CATEGORY_COLORS[problem.category] },
                      ]}
                    >
                      {problem.category}
                    </Text>
                  </View>
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
        
        {filteredProblems.length === 0 && (
          <View style={styles.emptyState}>
            <Search size={48} color={Colors.light.tabIconDefault} />
            <Text style={styles.emptyStateTitle}>No problems found</Text>
            <Text style={styles.emptyStateText}>
              Try adjusting your search or filter
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: Colors.light.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  searchInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.light.text,
  },
  categoryScroll: {
    flexGrow: 0,
    backgroundColor: Colors.light.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  categoryScrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  categoryChipActive: {
    backgroundColor: Colors.light.tint,
    borderColor: Colors.light.tint,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Colors.light.text,
  },
  categoryChipTextActive: {
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
  problemHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: "600" as const,
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
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    gap: 12,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "600" as const,
    color: Colors.light.text,
  },
  emptyStateText: {
    fontSize: 14,
    color: Colors.light.secondaryText,
  },
});
