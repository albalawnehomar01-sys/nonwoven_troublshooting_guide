import { Stack } from "expo-router";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { BookOpen, Package, Heart, Home, Shirt, ShoppingBag, Car, Droplet } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Colors from "@/constants/colors";

interface Application {
  id: string;
  title: string;
  icon: typeof Package;
  color: string;
  description: string;
  examples: string[];
}

const APPLICATIONS: Application[] = [
  {
    id: "1",
    title: "Medical & Hygiene",
    icon: Heart,
    color: "#EF4444",
    description: "Critical applications in healthcare and personal hygiene products",
    examples: [
      "Surgical gowns and drapes",
      "Face masks and respirators",
      "Wound dressings",
      "Baby diapers",
      "Feminine hygiene products",
      "Adult incontinence products",
      "Medical wipes and swabs",
    ],
  },
  {
    id: "2",
    title: "Home Furnishings",
    icon: Home,
    color: "#3B82F6",
    description: "Comfort and durability for residential applications",
    examples: [
      "Carpet backing",
      "Upholstery backing",
      "Mattress padding",
      "Pillow filling",
      "Bedding components",
      "Curtain interlining",
      "Wall coverings",
    ],
  },
  {
    id: "3",
    title: "Apparel & Fashion",
    icon: Shirt,
    color: "#8B5CF6",
    description: "Versatile materials for clothing and accessories",
    examples: [
      "Garment interlining",
      "Shoe linings",
      "Hat components",
      "Shoulder pads",
      "Bra cups",
      "Bag linings",
      "Belt backing",
    ],
  },
  {
    id: "4",
    title: "Filtration",
    icon: Droplet,
    color: "#06B6D4",
    description: "Essential materials for air and liquid filtration",
    examples: [
      "HVAC filters",
      "Automotive cabin filters",
      "Industrial air filters",
      "Water filtration",
      "Oil filtration",
      "Face mask filters",
      "Vacuum cleaner bags",
    ],
  },
  {
    id: "5",
    title: "Automotive",
    icon: Car,
    color: "#F59E0B",
    description: "Durable components for automotive applications",
    examples: [
      "Headliners",
      "Trunk liners",
      "Door panels",
      "Carpet backing",
      "Sound insulation",
      "Seat components",
      "Under-hood insulation",
    ],
  },
  {
    id: "6",
    title: "Packaging",
    icon: Package,
    color: "#10B981",
    description: "Protective and sustainable packaging solutions",
    examples: [
      "Protective wrapping",
      "Envelope padding",
      "Gift wrap",
      "Food packaging",
      "Insulated bags",
      "Tea/coffee bags",
      "Shipping materials",
    ],
  },
  {
    id: "7",
    title: "Agriculture",
    icon: ShoppingBag,
    color: "#84CC16",
    description: "Innovative solutions for agricultural needs",
    examples: [
      "Crop covers",
      "Greenhouse fabrics",
      "Mulch films",
      "Plant protection",
      "Seed blankets",
      "Weed control fabrics",
      "Soil stabilization",
    ],
  },
  {
    id: "8",
    title: "Geotextiles",
    icon: BookOpen,
    color: "#6366F1",
    description: "Engineering fabrics for construction and civil projects",
    examples: [
      "Road construction",
      "Drainage systems",
      "Erosion control",
      "Landfill liners",
      "Railway track bed",
      "Foundation stabilization",
      "Retaining walls",
    ],
  },
];

export default function ApplicationsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Stack.Screen 
        options={{ 
          title: "Applications",
          headerStyle: {
            backgroundColor: Colors.light.card,
          },
          headerTintColor: Colors.light.text,
        }} 
      />
      
      <View style={styles.header}>
        <BookOpen size={28} color={Colors.light.tint} />
        <Text style={styles.headerTitle}>Nonwoven Applications</Text>
        <Text style={styles.headerSubtitle}>
          Discover the diverse uses of nonwoven fabrics across industries
        </Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {APPLICATIONS.map((app) => {
          const IconComponent = app.icon;
          return (
            <View key={app.id} style={styles.applicationCard}>
              <View style={styles.applicationHeader}>
                <View style={[styles.iconContainer, { backgroundColor: app.color + "20" }]}>
                  <IconComponent size={28} color={app.color} />
                </View>
                <View style={styles.applicationHeaderText}>
                  <Text style={styles.applicationTitle}>{app.title}</Text>
                  <Text style={styles.applicationDescription}>{app.description}</Text>
                </View>
              </View>

              <View style={styles.examplesList}>
                <Text style={styles.examplesTitle}>Common Uses:</Text>
                {app.examples.map((example, index) => (
                  <View key={index} style={styles.exampleItem}>
                    <View style={[styles.exampleBullet, { backgroundColor: app.color }]} />
                    <Text style={styles.exampleText}>{example}</Text>
                  </View>
                ))}
              </View>
            </View>
          );
        })}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Nonwoven fabrics are used in over 100 different applications worldwide,
            making them one of the most versatile materials in modern manufacturing.
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
  applicationCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    padding: 20,
    gap: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  applicationHeader: {
    flexDirection: "row",
    gap: 12,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  applicationHeaderText: {
    flex: 1,
    gap: 4,
  },
  applicationTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: Colors.light.text,
  },
  applicationDescription: {
    fontSize: 14,
    color: Colors.light.secondaryText,
    lineHeight: 20,
  },
  examplesList: {
    gap: 8,
  },
  examplesTitle: {
    fontSize: 15,
    fontWeight: "600" as const,
    color: Colors.light.text,
    marginBottom: 4,
  },
  exampleItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  exampleBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  exampleText: {
    fontSize: 14,
    color: Colors.light.text,
    flex: 1,
  },
  footer: {
    backgroundColor: Colors.light.card,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  footerText: {
    fontSize: 14,
    color: Colors.light.secondaryText,
    lineHeight: 22,
    textAlign: "center",
  },
});
