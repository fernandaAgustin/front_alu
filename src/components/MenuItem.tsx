import { Ionicons } from "@expo/vector-icons";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import {
    MenuItemProps
} from "../interfaces/menu.interface";

export default function MenuItem({
    title,
    iconName,
    onPress
}: MenuItemProps) {

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
        >
            <View style={styles.iconBox}>
                <Ionicons name={iconName as any} size={22} color="#1a1a1a" />
            </View>
            <Text style={styles.title}>{title}</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 18,
        paddingHorizontal: 24,
        borderBottomWidth: 1,
        borderBottomColor: "#f5f5f5",
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: "#f5f5f5",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },
    title: {
        flex: 1,
        fontSize: 15,
        fontWeight: "500",
        color: "#1a1a1a",
    },
});
