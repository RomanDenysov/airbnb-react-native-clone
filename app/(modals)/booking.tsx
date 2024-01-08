import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	TextInput,
	Image,
} from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import Animated, { FadeIn, FadeOut, SlideInDown } from "react-native-reanimated";
import { defaultStyles } from "@/constants/Styles";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { places } from "@/assets/data/places";

// @ts-ignore
import DatePicker from "react-native-modern-datepicker";

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const guestsGroups = [
	{
		name: "Adults",
		text: "Ages 13 or above",
		count: 0,
	},
	{
		name: "Children",
		text: "Ages 2-12",
		count: 0,
	},
	{
		name: "Infants",
		text: "Under 2",
		count: 0,
	},
	{
		name: "Pets",
		text: "Pets allowed",
		count: 0,
	},
];

const Page = () => {
	const router = useRouter();
	const [openCard, setOpenCard] = useState(0);
	const [selectedPlace, setSelectedPlace] = useState(0);
	const today = new Date().toISOString().substring(0, 10);
	const [groups, setGroups] = useState(guestsGroups);

	const onClearAll = () => {
		setSelectedPlace(0);
		setOpenCard(0);
		setGroups(guestsGroups);
	};

	return (
		<BlurView intensity={70} style={styles.container} tint="light">
			{/* WHERE */}
			<View style={styles.card}>
				{openCard != 0 && (
					<AnimatedTouchableOpacity
						onPress={() => setOpenCard(0)}
						style={styles.cardPreview}
						entering={FadeIn.duration(200)}
						exiting={FadeOut.duration(200)}
					>
						<Text style={styles.previewText}>Where</Text>
						<Text style={styles.previewDate}>I`m flexible</Text>
					</AnimatedTouchableOpacity>
				)}
				{openCard === 0 && (
					<>
						<Animated.Text entering={FadeIn} style={styles.cardHeader}>
							Where to?
						</Animated.Text>
						<Animated.View style={styles.cardBody}>
							<View style={styles.searchSection}>
								<Ionicons style={styles.searchIcon} name="ios-search" size={20} />
								<TextInput
									style={styles.inputField}
									placeholder="Search destination"
									placeholderTextColor={Colors.grey}
								/>
							</View>
						</Animated.View>

						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							contentContainerStyle={{ gap: 20, paddingLeft: 20, paddingBottom: 30 }}
						>
							{places.map((item, index) => (
								<TouchableOpacity
									key={index}
									onPress={() => setSelectedPlace(index)}
								>
									<Image
										source={item.img}
										style={
											selectedPlace === index
												? styles.placeSelected
												: styles.place
										}
									/>
									<Text
										style={[
											{ fontFamily: "rob", paddingTop: 6 },
											selectedPlace === index
												? { fontFamily: "rob-b" }
												: null,
										]}
									>
										{item.title}
									</Text>
								</TouchableOpacity>
							))}
						</ScrollView>
					</>
				)}
			</View>

			{/* WHEN */}
			<View style={styles.card}>
				{openCard != 1 && (
					<AnimatedTouchableOpacity
						onPress={() => setOpenCard(1)}
						style={styles.cardPreview}
						entering={FadeIn.duration(200)}
						exiting={FadeOut.duration(200)}
					>
						<Text style={styles.previewText}>When</Text>
						<Text style={styles.previewDate}>Any week</Text>
					</AnimatedTouchableOpacity>
				)}
				{openCard === 1 && (
					<>
						<Animated.Text entering={FadeIn} style={styles.cardHeader}>
							When`s your trip?
						</Animated.Text>
						<Animated.View style={styles.cardBody}>
							<DatePicker
								current={today}
								selected={today}
								mode="calendar"
								options={{
									defaultFont: "rob",
									headerFont: "rob-m",
									borderColor: "transparent",
									mainColor: Colors.primary,
								}}
							/>
						</Animated.View>
					</>
				)}
			</View>
			{/* WHO */}
			<View style={styles.card}>
				{openCard != 2 && (
					<AnimatedTouchableOpacity
						onPress={() => setOpenCard(2)}
						style={styles.cardPreview}
						entering={FadeIn.duration(200)}
						exiting={FadeOut.duration(200)}
					>
						<Text style={styles.previewText}>Who</Text>
						<Text style={styles.previewDate}>Add guests</Text>
					</AnimatedTouchableOpacity>
				)}
				{openCard === 2 && (
					<>
						<Animated.Text entering={FadeIn} style={styles.cardHeader}>
							Who`s coming?
						</Animated.Text>
						<Animated.View style={styles.cardBody}>
							{groups.map((item, index) => (
								<View
									key={index}
									style={[
										styles.guestItem,
										index + 1 < guestsGroups.length ? styles.itemBorder : null,
									]}
								>
									<View>
										<Text style={{ fontFamily: "rob-m", fontSize: 16 }}>
											{item.name}
										</Text>
										<Text
											style={{
												fontFamily: "rob",
												fontSize: 14,
												color: Colors.grey,
											}}
										>
											{item.text}
										</Text>
									</View>
									<View
										style={{
											flexDirection: "row",
											gap: 10,
											alignItems: "center",
											justifyContent: "center",
										}}
									>
										<TouchableOpacity
											onPress={() => {
												const newGroups = [...groups];
												newGroups[index].count =
													newGroups[index].count > 0
														? newGroups[index].count - 1
														: 0;
												setGroups(newGroups);
											}}
										>
											<Ionicons
												name="remove-circle-outline"
												size={26}
												color={
													groups[index].count > 0
														? Colors.grey
														: "#cdcdcd"
												}
											/>
										</TouchableOpacity>
										<Text
											style={{
												fontFamily: "rob-m",
												fontSize: 16,
												minWidth: 18,
												textAlign: "center",
											}}
										>
											{item.count}
										</Text>
										<TouchableOpacity
											onPress={() => {
												const newGroups = [...groups];
												newGroups[index].count++;
												setGroups(newGroups);
											}}
										>
											<Ionicons
												name="add-circle-outline"
												size={26}
												color={Colors.grey}
											/>
										</TouchableOpacity>
									</View>
								</View>
							))}
						</Animated.View>
					</>
				)}
			</View>
			{/* FOOTER */}
			<Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)}>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<TouchableOpacity onPress={onClearAll}>
						<Text
							style={{
								fontSize: 18,
								fontFamily: "rob-m",
								textDecorationLine: "underline",
							}}
						>
							Clear All
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => router.back()}
						style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 50 }]}
					>
						<Ionicons
							name="search-outline"
							size={24}
							color={"#fff"}
							style={defaultStyles.btnIcon}
						/>
						<Text style={defaultStyles.btnText}>Search</Text>
					</TouchableOpacity>
				</View>
			</Animated.View>
		</BlurView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 100,
	},
	card: {
		backgroundColor: "#fff",
		borderRadius: 14,
		margin: 10,
		elevation: 4,
		shadowColorL: "#000",
		shadowOpacity: 0.3,
		shadowRadius: 4,
		shadowOffset: {
			width: 2,
			height: 2,
		},
		gap: 20,
	},
	previewText: {
		fontFamily: "rob-m",
		fontSize: 14,
		color: Colors.grey,
	},
	previewDate: {
		fontFamily: "rob-m",
		fontSize: 14,
		color: Colors.dark,
	},
	cardPreview: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 20,
	},
	cardHeader: {
		fontFamily: "rob-b",
		fontSize: 24,
		padding: 20,
	},
	cardBody: {
		paddingHorizontal: 20,
	},
	searchSection: {
		height: 50,
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#ABABAB",
		borderRadius: 8,
		backgroundColor: "#fff",
		alignContent: "center",
		marginBottom: 4,
	},
	inputField: {
		flex: 1,
		padding: 10,
		backgroundColor: "#fff",
	},
	searchIcon: {
		padding: 10,
	},
	place: {
		width: 120,
		height: 120,
		borderRadius: 10,
	},
	placeSelected: {
		width: 120,
		height: 120,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: Colors.grey,
	},
	guestItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 16,
	},
	itemBorder: {
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: Colors.grey,
	},
});

export default Page;
