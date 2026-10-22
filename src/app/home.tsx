
import {
    faArrowRight,
    faBars,
    faChevronRight,
    faCircleCheck,
    faEnvelope,
    faGear,
    faHouse,
    faUser,
    faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import SideMenu from "../components/SideMenu";
import { RootState, logout } from "../store/store";
import { removeStorage } from "../utils/authStorage";

export default function HomeScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const user = useSelector(
    (state: RootState) => state.auth.user
  );

  const firstName = user?.nombre
    ? user.nombre.split(" ")[0]
    : user?.email
      ? user.email.split("@")[0]
      : "Usuario";

  const handleLogout = async () => {
    setMenuOpen(false);
    await removeStorage("user_token");
    await removeStorage("user_info");
    dispatch(logout());
    router.replace("/");
  };

  const shortcuts = [
    {
      title: "Mi perfil",
      description: "Consulta tus datos personales",
      icon: faUser,
      color: "#E9EEFF",
      iconColor: "#4263D8",
      action: () => router.push("/profile"),
    },
    {
      title: "Configuración",
      description: "Administra tus preferencias",
      icon: faGear,
      color: "#E3F6EE",
      iconColor: "#209568",
      action: () => router.push("/settings"),
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F5F7FB"
      />

      <View style={styles.container}>
        {/* Encabezado */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setMenuOpen(true)}
            activeOpacity={0.7}
          >
            <FontAwesomeIcon
              icon={faBars}
              size={21}
              color="#293650"
            />
          </TouchableOpacity>

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Inicio</Text>
            <Text style={styles.headerSubtitle}>
              Tu espacio personal
            </Text>
          </View>

          <TouchableOpacity
            style={styles.avatar}
            onPress={() => router.push("/profile")}
            activeOpacity={0.7}
          >
            <FontAwesomeIcon
              icon={faUser}
              size={19}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Bienvenida */}
          <View style={styles.welcomeCard}>
            <View style={styles.circleDecoration} />
            <View style={styles.circleDecorationSmall} />

            <View style={styles.welcomeIcon}>
              <FontAwesomeIcon
                icon={faHouse}
                size={20}
                color="#FFFFFF"
              />
            </View>

            <Text style={styles.welcomeLabel}>
              BIENVENIDO/A
            </Text>

            <Text style={styles.welcomeTitle}>
              ¡Hola, {firstName}!
            </Text>

            <Text style={styles.welcomeDescription}>
              Nos alegra verte nuevamente. Accede a tus
              herramientas y continúa con tus actividades.
            </Text>

            <View style={styles.statusBadge}>
              <FontAwesomeIcon
                icon={faCircleCheck}
                size={13}
                color="#16865B"
              />
              <Text style={styles.statusText}>
                Sesión activa
              </Text>
            </View>
          </View>

          {/* Accesos rápidos */}
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                Accesos rápidos
              </Text>
              <Text style={styles.sectionSubtitle}>
                Gestiona tu cuenta fácilmente
              </Text>
            </View>
          </View>

          <View style={styles.shortcutList}>
            {shortcuts.map((item) => (
              <TouchableOpacity
                key={item.title}
                style={styles.shortcutCard}
                onPress={item.action}
                activeOpacity={0.75}
              >
                <View
                  style={[
                    styles.shortcutIcon,
                    { backgroundColor: item.color },
                  ]}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    size={21}
                    color={item.iconColor}
                  />
                </View>

                <View style={styles.shortcutInfo}>
                  <Text style={styles.shortcutTitle}>
                    {item.title}
                  </Text>
                  <Text style={styles.shortcutDescription}>
                    {item.description}
                  </Text>
                </View>

                <FontAwesomeIcon
                  icon={faChevronRight}
                  size={14}
                  color="#A1AABD"
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Información del usuario */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Información de la cuenta
            </Text>
          </View>

          <View style={styles.accountCard}>
            <View style={styles.accountIcon}>
              <FontAwesomeIcon
                icon={faEnvelope}
                size={20}
                color="#D97732"
              />
            </View>

            <View style={styles.accountInfo}>
              <Text style={styles.accountLabel}>
                Correo electrónico
              </Text>
              <Text style={styles.accountValue}>
                {user?.email ?? "No disponible"}
              </Text>
            </View>
          </View>

          {/* Enlace al perfil */}
          <TouchableOpacity
            style={styles.profileLink}
            onPress={() => router.push("/profile")}
            activeOpacity={0.7}
          >
            <FontAwesomeIcon
              icon={faUserCircle}
              size={19}
              color="#4263D8"
            />
            <Text style={styles.profileLinkText}>
              Ver mi perfil completo
            </Text>
            <FontAwesomeIcon
              icon={faArrowRight}
              size={14}
              color="#4263D8"
            />
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Gracias por utilizar nuestra aplicación.
          </Text>
        </ScrollView>

        <SideMenu
          visible={menuOpen}
          onClose={() => setMenuOpen(false)}
          onProfile={() => {
            setMenuOpen(false);
            router.push("/profile");
          }}
          onSettings={() => {
            setMenuOpen(false);
            router.push("/settings");
          }}
          onLogout={handleLogout}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 22,
    paddingVertical: 15,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EAEFF5",
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#F1F4FA",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 14,
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#202C43",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#8994A8",
    marginTop: 3,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: "#4263D8",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
  scrollContent: {
    padding: 22,
    paddingBottom: 35,
  },
  welcomeCard: {
    backgroundColor: "#3157C8",
    borderRadius: 25,
    padding: 25,
    overflow: "hidden",
    marginBottom: 30,
  },
  circleDecoration: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#5275DD",
    opacity: 0.5,
    top: -80,
    right: -45,
  },
  circleDecorationSmall: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#6B87E5",
    opacity: 0.25,
    bottom: -55,
    right: 45,
  },
  welcomeIcon: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  welcomeLabel: {
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: "800",
    color: "#DCE5FF",
    marginBottom: 10,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  welcomeDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: "#E4EAFF",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 22,
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    gap: 7,
  },
  statusText: {
    color: "#3157C8",
    fontSize: 12,
    fontWeight: "700",
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#202C43",
  },
  sectionSubtitle: {
    fontSize: 13,
    color: "#8994A8",
    marginTop: 5,
  },
  shortcutList: {
    gap: 12,
    marginBottom: 30,
  },
  shortcutCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 19,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EAEFF5",
  },
  shortcutIcon: {
    width: 51,
    height: 51,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  shortcutInfo: {
    flex: 1,
    marginLeft: 14,
    marginRight: 8,
  },
  shortcutTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#202C43",
  },
  shortcutDescription: {
    fontSize: 12,
    color: "#8994A8",
    marginTop: 5,
  },
  accountCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderRadius: 19,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EAEFF5",
  },
  accountIcon: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: "#FFF1E6",
    alignItems: "center",
    justifyContent: "center",
  },
  accountInfo: {
    flex: 1,
    marginLeft: 13,
  },
  accountLabel: {
    fontSize: 12,
    color: "#8994A8",
    marginBottom: 5,
  },
  accountValue: {
    fontSize: 13,
    fontWeight: "600",
    color: "#202C43",
  },
  profileLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#EAEFFF",
    padding: 17,
    borderRadius: 16,
    marginTop: 18,
  },
  profileLinkText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
    color: "#3157C8",
  },
  footerText: {
    textAlign: "center",
    fontSize: 12,
    color: "#929CAF",
    marginTop: 30,
  },
});
