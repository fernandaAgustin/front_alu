
import {
    faArrowLeft,
    faChevronRight,
    faEnvelope,
    faGear,
    faGraduationCap,
    faHouse,
    faIdCard,
    faRightFromBracket,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useRouter } from "expo-router";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { RootState, logout } from "../store/store";
import { removeStorage } from "../utils/authStorage";

export default function ProfileScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  const displayName = user?.nombre
    ? `${user.nombre} ${user.apellido ?? ""}`.trim()
    : user?.email
      ? user.email.split("@")[0]
      : "Alumno";

  const initial = displayName.charAt(0).toUpperCase();

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/home");
    }
  };

  const handleLogout = async () => {
    try {
      await removeStorage("user_token");
      await removeStorage("user_info");
      dispatch(logout());
      router.replace("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          isTablet && styles.tabletContent,
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Encabezado */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={handleGoBack}
              style={styles.backButton}
              accessibilityLabel="Regresar"
              accessibilityRole="button"
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                size={18}
                color="#263653"
              />
            </TouchableOpacity>

            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>Mi perfil</Text>
              <Text style={styles.headerSubtitle}>
                Consulta tu información personal
              </Text>
            </View>
          </View>

          {/* Tarjeta de perfil */}
          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{initial}</Text>
              </View>
              <View style={styles.onlineIndicator} />
            </View>

            <Text style={styles.name}>{displayName}</Text>

            <View style={styles.roleBadge}>
              <FontAwesomeIcon
                icon={faGraduationCap}
                size={13}
                color="#3157C8"
              />
              <Text style={styles.roleText}>Alumno</Text>
            </View>

            <View style={styles.profileDivider} />

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  size={16}
                  color="#3157C8"
                />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Correo electrónico</Text>
                <Text style={styles.infoValue}>
                  {user?.email || "Sin correo registrado"}
                </Text>
              </View>
            </View>

            {user?.matricula ? (
              <View style={styles.infoRow}>
                <View style={styles.infoIcon}>
                  <FontAwesomeIcon
                    icon={faIdCard}
                    size={16}
                    color="#3157C8"
                  />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Matrícula</Text>
                  <Text style={styles.infoValue}>{user.matricula}</Text>
                </View>
              </View>
            ) : null}
          </View>

          {/* Navegación */}
          <Text style={styles.sectionTitle}>Mi espacio</Text>

          <View style={styles.optionsCard}>
            <TouchableOpacity
              style={styles.optionRow}
              onPress={() => router.replace("/home")}
              accessibilityRole="button"
            >
              <View style={styles.optionIconBlue}>
                <FontAwesomeIcon
                  icon={faHouse}
                  size={18}
                  color="#3157C8"
                />
              </View>

              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>Inicio</Text>
                <Text style={styles.optionDescription}>
                  Regresar a la pantalla principal
                </Text>
              </View>

              <FontAwesomeIcon
                icon={faChevronRight}
                size={14}
                color="#A1AABE"
              />
            </TouchableOpacity>

            <View style={styles.optionDivider} />

            <View style={styles.optionRow}>
              <View style={styles.optionIconPurple}>
                <FontAwesomeIcon
                  icon={faUser}
                  size={18}
                  color="#7757C8"
                />
              </View>

              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>Mi perfil</Text>
                <Text style={styles.optionDescription}>
                  Estás consultando tu información
                </Text>
              </View>

              <View style={styles.currentBadge}>
                <Text style={styles.currentBadgeText}>Actual</Text>
              </View>
            </View>

            <View style={styles.optionDivider} />

            <TouchableOpacity
              style={styles.optionRow}
              onPress={() => router.push("/settings")}
              accessibilityRole="button"
            >
              <View style={styles.optionIconGray}>
                <FontAwesomeIcon
                  icon={faGear}
                  size={18}
                  color="#64748B"
                />
              </View>

              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>Configuración</Text>
                <Text style={styles.optionDescription}>
                  Preferencias de la aplicación
                </Text>
              </View>

              <FontAwesomeIcon
                icon={faChevronRight}
                size={14}
                color="#A1AABE"
              />
            </TouchableOpacity>
          </View>

          {/* Cerrar sesión */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}
            accessibilityRole="button"
          >
            <FontAwesomeIcon
              icon={faRightFromBracket}
              size={17}
              color="#DC2626"
            />
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Mantén tu información de acceso segura.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3F6FC",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 28,
  },
  tabletContent: {
    alignItems: "center",
  },
  container: {
    width: "100%",
    maxWidth: 620,
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    gap: 14,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E7EBF3",
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "800",
    color: "#202C43",
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#8791A5",
    marginTop: 3,
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingHorizontal: 22,
    paddingTop: 26,
    paddingBottom: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E9EDF5",
    shadowColor: "#25365B",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.04,
    shadowRadius: 14,
    elevation: 2,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 14,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 30,
    backgroundColor: "#3157C8",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 5,
    borderColor: "#E9EEFF",
  },
  avatarText: {
    fontSize: 36,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  onlineIndicator: {
    position: "absolute",
    width: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: "#22C55E",
    borderWidth: 3,
    borderColor: "#FFFFFF",
    right: 0,
    bottom: 3,
  },
  name: {
    fontSize: 22,
    fontWeight: "800",
    color: "#202C43",
    textAlign: "center",
  },
  roleBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    backgroundColor: "#EDF2FF",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    marginTop: 10,
  },
  roleText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#3157C8",
  },
  profileDivider: {
    height: 1,
    width: "100%",
    backgroundColor: "#EDF0F6",
    marginVertical: 21,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 16,
    gap: 12,
  },
  infoIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#EDF2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  infoContent: {
    flex: 1,
    minWidth: 0,
  },
  infoLabel: {
    fontSize: 12,
    color: "#8791A5",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#263653",
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#263653",
    marginTop: 27,
    marginBottom: 13,
  },
  optionsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E9EDF5",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 17,
    gap: 12,
  },
  optionIconBlue: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: "#EDF2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  optionIconPurple: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: "#F1EDFF",
    alignItems: "center",
    justifyContent: "center",
  },
  optionIconGray: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: "#F0F3F8",
    alignItems: "center",
    justifyContent: "center",
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#263653",
  },
  optionDescription: {
    fontSize: 11,
    color: "#8791A5",
    marginTop: 4,
  },
  optionDivider: {
    height: 1,
    backgroundColor: "#EDF0F6",
    marginLeft: 56,
  },
  currentBadge: {
    backgroundColor: "#EAF8EF",
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  currentBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#21834A",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#FFF1F2",
    borderWidth: 1,
    borderColor: "#FFE0E3",
    borderRadius: 16,
    paddingVertical: 16,
    marginTop: 25,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#DC2626",
  },
  footerText: {
    fontSize: 11,
    color: "#A0A8B8",
    textAlign: "center",
    marginTop: 18,
  },
});
