import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import React, { useRef, useState } from "react";
import { Link } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import * as Haptics from "expo-haptics";

const categories = [
	{
		name: "Tiny homes",
		icon: "home",
	},
	{
		name: "Cabins",
		icon: "house-siding",
	},
	{
		name: "Trending",
		icon: "local-fire-department",
	},
	{
		name: "Play",
		icon: "videogame-asset",
	},
	{
		name: "City",
		icon: "apartment",
	},
	{
		name: "Beachfront",
		icon: "beach-access",
	},
	{
		name: "Countryside",
		icon: "nature-people",
	},
];

interface Props {
	onCategoryChanged: (category: string) => void;
}

const ExploreHeader = ({ onCategoryChanged }: Props) => {
	const scrollRef = useRef<ScrollView>(null);
	const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
	const [activeIndex, setActiveIndex] = useState(0);

	const selectCategory = (index: number) => {
		const selected = itemsRef.current[index];
		setActiveIndex(index);

		selected?.measure((x) => {
			scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
		});

		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		onCategoryChanged(categories[index].name);
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#ffff" }}>
			<View style={styles.container}>
				<View style={styles.actionRaw}>
					<Link href={"/(modals)/booking"} asChild>
						<TouchableOpacity style={styles.searchBtn}>
							<Ionicons name="search" size={24} />
							<View>
								<Text style={{ fontFamily: "rob-b" }}>Where to?</Text>
								<Text style={{ fontFamily: "rob-m", color: Colors.grey }}>
									Anywhere - Any week
								</Text>
							</View>
						</TouchableOpacity>
					</Link>
					<TouchableOpacity style={styles.filterBtn}>
						<Ionicons name="options-outline" size={24} />
					</TouchableOpacity>
				</View>

				<ScrollView
					ref={scrollRef}
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{
						alignItems: "center",
						gap: 30,
						paddingHorizontal: 16,
					}}
				>
					{categories.map((item, index) => (
						<TouchableOpacity
							onPress={() => selectCategory(index)}
							key={index}
							ref={(el) => (itemsRef.current[index] = el)}
							style={
								activeIndex === index
									? styles.categoriesBtnActive
									: styles.categoriesBtn
							}
						>
							<MaterialIcons
								name={item.icon as any}
								size={24}
								color={activeIndex === index ? "#000" : Colors.grey}
								style={{ paddingBottom: 4 }}
							/>
							<Text
								style={
									activeIndex === index
										? styles.categoryTextActive
										: styles.categoryText
								}
							>
								{item.name}
							</Text>
						</TouchableOpacity>
					))}
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		height: 130,
	},
	actionRaw: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 24,
		paddingBottom: 16,
		gap: 10,
	},
	filterBtn: {
		padding: 10,
		borderWidth: 1,
		borderColor: Colors.grey,
		borderRadius: 24,
	},
	searchBtn: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		borderColor: "#c2c2c2",
		borderWidth: StyleSheet.hairlineWidth,
		flex: 1,
		borderRadius: 30,
		paddingVertical: 10,
		paddingHorizontal: 14,
		backgroundColor: "#fff",

		elevation: 2,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 6,
		shadowOffset: {
			width: 1,
			height: 1,
		},
	},
	categoryText: {
		fontSize: 14,
		fontFamily: "rob",
		color: Colors.grey,
	},
	categoryTextActive: {
		fontSize: 14,
		fontFamily: "rob",
		color: "#000",
	},
	categoriesBtn: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingBottom: 8,
	},
	categoriesBtnActive: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingBottom: 8,
		borderBottomColor: "#000",
		borderBottomWidth: 2,
	},
});

export default ExploreHeader;
