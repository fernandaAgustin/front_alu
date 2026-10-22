
import {
    faArrowLeft,
    faBell,
    faChevronRight,
    faCircleInfo,
    faCircleQuestion,
    faGear,
    faRightFromBracket,
    faShieldHalved,
    faSliders,
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

export default function SettingsScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const handleLogout = () => {
    router.replace("/");
  };

  const renderOption = (
    title: string,
    description: string,
    icon: typeof faCircleInfo,
    iconColor: string,
    iconBackground: string,
    onPress?: () => void,
  ) => (
    <TouchableOpacity
      key={title}
      style={styles.option}
      activeOpacity={0.75}
      onPress={onPress ?? (() => {})}
      accessibilityRole="button"
    >
      <View
        style={[
          styles.optionIcon,
          { backgroundColor: iconBackground },
        ]}
      >
        <FontAwesomeIcon
          icon={icon}
          size={19}
          color={iconColor}
        />
      </View>

      <View style={styles.optionContent}>
        <Text style={styles.optionTitle}>{title}</Text>
        <Text style={styles.optionDescription}>{description}</Text>
      </View>

      <FontAwesomeIcon
        icon={faChevronRight}
        size={14}
        color="#A1AABE"
      />
    </TouchableOpacity>
  );

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
              style={styles.backButton}
              onPress={() => {
                if (router.canGoBack()) {
                  router.back();
                } else {
                  router.replace("/home");
                }
              }}
              accessibilityRole="button"
              accessibilityLabel="Regresar"
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                size={18}
                color="#263653"
              />
            </TouchableOpacity>

            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>Configuración</Text>
              <Text style={styles.headerSubtitle}>
                Personaliza tu experiencia
              </Text>
            </View>

            <View style={styles.headerIcon}>
              <FontAwesomeIcon
                icon={faGear}
                size={21}
                color="#3157C8"
              />
            </View>
          </View>

          {/* Presentación */}
          <View style={styles.introCard}>
            <View style={styles.introIcon}>
              <FontAwesomeIcon
                icon={faSliders}
                size={25}
                color="#FFFFFF"
              />
            </View>

            <View style={styles.introTextContainer}>
              <Text style={styles.introTitle}>
                Ajustes de la aplicación
              </Text>
              <Text style={styles.introDescription}>
                Administra tus preferencias, seguridad y opciones
                de ayuda desde un solo lugar.
              </Text>
            </View>
          </View>

          {/* Opciones */}
          <Text style={styles.sectionTitle}>PREFERENCIAS</Text>

          <View style={styles.optionsCard}>
            {renderOption(
              "Información de la app",
              "Conoce los detalles de la aplicación",
              faCircleInfo,
              "#3157C8",
              "#EDF2FF",
            )}

            <View style={styles.divider} />

            {renderOption(
              "Preferencias",
              "Personaliza las opciones disponibles",
              faSliders,
              "#7757C8",
              "#F1EDFF",
            )}

            <View style={styles.divider} />

            {renderOption(
              "Notificaciones",
              "Gestiona tus avisos y alertas",
              faBell,
              "#D97706",
              "#FFF4DF",
            )}
          </View>

          <Text style={styles.sectionTitle}>AYUDA Y SEGURIDAD</Text>

          <View style={styles.optionsCard}>
            {renderOption(
              "Privacidad",
              "Información sobre la protección de tus datos",
              faShieldHalved,
              "#16845B",
              "#E6F7EF",
            )}

            <View style={styles.divider} />

            {renderOption(
              "Ayuda y soporte",
              "Consulta información y asistencia",
              faCircleQuestion,
              "#0284C7",
              "#E7F5FF",
            )}
          </View>

          {/* Cerrar sesión */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}
            accessibilityRole="button"
          >
            <View style={styles.logoutIcon}>
              <FontAwesomeIcon
                icon={faRightFromBracket}
                size={18}
                color="#DC2626"
              />
            </View>

            <View style={styles.logoutContent}>
              <Text style={styles.logoutTitle}>Cerrar sesión</Text>
              <Text style={styles.logoutDescription}>
                Salir de tu cuenta actual
              </Text>
            </View>

            <FontAwesomeIcon
              icon={faChevronRight}
              size={14}
              color="#DC2626"
            />
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Configura tu espacio a tu manera.
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
    paddingBottom: 30,
  },
  tabletContent: {
    alignItems: "center",
  },
  container: {
    width: "100%",
    maxWidth: 650,
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    gap: 13,
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
    fontSize: 24,
    fontWeight: "800",
    color: "#202C43",
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#8791A5",
    marginTop: 4,
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: "#E8EEFF",
    alignItems: "center",
    justifyContent: "center",
  },
  introCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3157C8",
    padding: 20,
    borderRadius: 23,
    gap: 15,
    shadowColor: "#3157C8",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 3,
  },
  introIcon: {
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: "rgba(255,255,255,0.17)",
    alignItems: "center",
    justifyContent: "center",
  },
  introTextContainer: {
    flex: 1,
  },
  introTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  introDescription: {
    fontSize: 12,
    lineHeight: 19,
    color: "#E0E8FF",
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
    color: "#8791A5",
    marginTop: 28,
    marginBottom: 12,
    marginLeft: 4,
  },
  optionsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 21,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#E8EDF5",
    shadowColor: "#25365B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.035,
    shadowRadius: 10,
    elevation: 1,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 16,
  },
  optionIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  optionContent: {
    flex: 1,
    minWidth: 0,
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#263653",
  },
  optionDescription: {
    fontSize: 11,
    lineHeight: 16,
    color: "#8791A5",
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#EDF0F6",
    marginLeft: 56,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#FFF1F2",
    borderWidth: 1,
    borderColor: "#FFE0E3",
    borderRadius: 18,
    padding: 14,
    marginTop: 30,
  },
  logoutIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutContent: {
    flex: 1,
  },
  logoutTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#DC2626",
  },
  logoutDescription: {
    fontSize: 11,
    color: "#B45353",
    marginTop: 4,
  },
  footerText: {
    fontSize: 11,
    color: "#A0A8B8",
    textAlign: "center",
    marginTop: 22,
  },
});
