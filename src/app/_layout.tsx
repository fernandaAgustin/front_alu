
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from "react-native";
import { Provider, useDispatch } from "react-redux";

import { setToken, setUser, store } from "../store/store";
import { getStorage } from "../utils/authStorage";

function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const [isRestoring, setIsRestoring] = useState(true);
  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  useEffect(() => {
    let mounted = true;

    const restoreSession = async () => {
      try {
        const token = await getStorage("user_token");
        const savedUser = await getStorage("user_info");

        if (token && savedUser) {
          const parsedUser = JSON.parse(savedUser);

          if (mounted) {
            dispatch(setToken(token));
            dispatch(setUser(parsedUser));
          }
        }
      } catch (error) {
        console.error("Error al restaurar sesión:", error);
      } finally {
        if (mounted) {
          setIsRestoring(false);
        }
      }
    };

    restoreSession();

    return () => {
      mounted = false;
    };
  }, [dispatch]);

  if (isRestoring) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View
          style={[
            styles.loadingContainer,
            isTablet && styles.tabletContainer,
          ]}
        >
          {/* Identidad visual */}
          <View style={styles.brandArea}>
            <View style={styles.iconContainer}>
              <FontAwesomeIcon
                icon={faGraduationCap}
                size={36}
                color="#FFFFFF"
              />
            </View>

            <View style={styles.decorativeDot} />
          </View>

          {/* Mensaje de carga */}
          <Text style={styles.loadingTitle}>
            Preparando tu espacio
          </Text>

          <Text style={styles.loadingSubtitle}>
            Estamos verificando tu sesión para ofrecerte una
            experiencia personalizada.
          </Text>

          {/* Indicador de progreso */}
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <View style={styles.statusDot} />
              <Text style={styles.progressLabel}>
                Iniciando aplicación
              </Text>
            </View>

            <ActivityIndicator
              size="large"
              color="#3157C8"
              style={styles.indicator}
            />

            <View style={styles.progressTrack}>
              <View style={styles.progressBar} />
            </View>

            <Text style={styles.progressHint}>
              Esto puede tardar unos segundos...
            </Text>
          </View>

          <Text style={styles.footerText}>
            Tu sesión se restaura de forma segura
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AuthInitializer>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: "#F3F6FC",
            },
            animation: "fade",
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="home" />
          <Stack.Screen name="profile" />
          <Stack.Screen name="settings" />
        </Stack>
      </AuthInitializer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3F6FC",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 26,
    paddingVertical: 30,
    backgroundColor: "#F3F6FC",
  },
  tabletContainer: {
    paddingHorizontal: 80,
  },
  brandArea: {
    position: "relative",
    marginBottom: 30,
  },
  iconContainer: {
    width: 88,
    height: 88,
    borderRadius: 28,
    backgroundColor: "#3157C8",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 6,
    borderColor: "#E4EAFF",
    shadowColor: "#3157C8",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 5,
  },
  decorativeDot: {
    position: "absolute",
    right: -3,
    bottom: 3,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#22C55E",
    borderWidth: 4,
    borderColor: "#F3F6FC",
  },
  loadingTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#202C43",
    textAlign: "center",
    letterSpacing: -0.5,
  },
  loadingSubtitle: {
    maxWidth: 340,
    fontSize: 14,
    lineHeight: 22,
    color: "#8791A5",
    textAlign: "center",
    marginTop: 10,
  },
  progressCard: {
    width: "100%",
    maxWidth: 380,
    marginTop: 32,
    padding: 22,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#E7EBF3",
    shadowColor: "#25365B",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.04,
    shadowRadius: 14,
    elevation: 2,
  },
  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginBottom: 20,
  },
  statusDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#3157C8",
  },
  progressLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#263653",
  },
  indicator: {
    marginBottom: 20,
  },
  progressTrack: {
    height: 5,
    backgroundColor: "#E9EEFC",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressBar: {
    width: "45%",
    height: "100%",
    backgroundColor: "#3157C8",
    borderRadius: 5,
  },
  progressHint: {
    fontSize: 12,
    color: "#8791A5",
    textAlign: "center",
    marginTop: 15,
  },
  footerText: {
    fontSize: 12,
    color: "#A0A8B8",
    textAlign: "center",
    marginTop: 28,
  },
});
