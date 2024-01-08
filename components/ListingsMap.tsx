import { View, Text, StyleSheet } from "react-native";
import React, { memo } from "react";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { defaultStyles } from "@/constants/Styles";
import { ListingGeo } from "@/interfaces/listingGeo";
import { useRouter } from "expo-router";
import MapView from "react-native-map-clustering";

interface Props {
	listings: any;
}
const INITIAL_REGION = {
	latitude: 52.52,
	longitude: 13.405,
	latitudeDelta: 9,
	longitudeDelta: 9,
};
const ListingsMap = memo(({ listings }: Props) => {
	const router = useRouter();
	const onMarkerSelected = (item: ListingGeo) => {
		router.push(`/listing/${item.properties.id}`);
	};

	const renderCluster = (cluster: any) => {
		const { id, geometry, onPress, properties } = cluster;
		const points = properties.point_count;

		return (
			<Marker
				key={`cluster-${id}`}
				onPress={onPress}
				coordinate={{
					longitude: geometry.coordinate[0],
					latitude: geometry.coordinate[1],
				}}
			>
				<View style={styles.marker}>
					<Text style={styles.markerText}>{points}</Text>
				</View>
			</Marker>
		);
	};

	return (
		<View style={defaultStyles.container}>
			<MapView
				animationEnabled={false}
				style={StyleSheet.absoluteFill}
				provider={PROVIDER_GOOGLE}
				showsUserLocation
				initialRegion={INITIAL_REGION}
				clusterColor="#fff"
				clusterTextColor="#000"
				clusterFontFamily="rob-m"
			>
				{listings.features.map((item: ListingGeo) => (
					<Marker
						onPress={() => onMarkerSelected(item)}
						key={item.properties.id}
						coordinate={{
							latitude: +item.properties.latitude,
							longitude: +item.properties.longitude,
						}}
					>
						<View style={styles.marker}>
							<Text style={styles.markerText}>€ {item.properties.price}</Text>
						</View>
					</Marker>
				))}
			</MapView>
		</View>
	);
});
const styles = StyleSheet.create({
	marker: {
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 4,
		paddingHorizontal: 6,
		borderRadius: 12,

		elevation: 5,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 6,
		shadowOffset: {
			width: 1,
			height: 10,
		},
	},
	markerText: {
		fontSize: 14,
		fontFamily: "rob-m",
	},
});

export default ListingsMap;
