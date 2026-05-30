import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { ChevronLeft, ChevronRight, Clock, MapPin, MoreHorizontal } from "lucide-react-native";
import { styles } from "./styles";
import FooterComponent from "@/components/footer";
import ButtonComponent from "@/components/button";

const UsersListView = () => {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.titleRow}>
                    <Text style={styles.logoText}>List of Users</Text>

                </View>

            </View>


            <ScrollView
                style={styles.cardsContainer}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.card}>
                    <View style={styles.cardInfoRow}>
                        <Text style={styles.cardDateText}>Usuário:</Text>
                        <Text style={styles.cardDateText}>BRYAN GAY</Text>
                    </View>
                    <View style={styles.cardInfoRow}>
                        <ButtonComponent title="Edit" onPress={() => { }} />
                        <ButtonComponent title="Delete" onPress={() => { }} />
                    </View>
                </View>
                <View style={styles.card}>
                    <View style={styles.cardInfoRow}>
                        <Text style={styles.cardDateText}>Usuário:</Text>
                        <Text style={styles.cardDateText}>BRYAN GAY</Text>
                    </View>
                    <View style={styles.cardInfoRow}>
                        <ButtonComponent title="Edit" onPress={() => { }} />
                        <ButtonComponent title="Delete" onPress={() => { }} />
                    </View>
                </View>
                <View style={styles.card}>
                    <View style={styles.cardInfoRow}>
                        <Text style={styles.cardDateText}>Usuário:</Text>
                        <Text style={styles.cardDateText}>BRYAN GAY</Text>
                    </View>
                    <View style={styles.cardInfoRow}>
                        <ButtonComponent title="Edit" onPress={() => { }} />
                        <ButtonComponent title="Delete" onPress={() => { }} />
                    </View>
                </View>
                <View style={styles.card}>
                    <View style={styles.cardInfoRow}>
                        <Text style={styles.cardDateText}>Usuário:</Text>
                        <Text style={styles.cardDateText}>BRYAN GAY</Text>
                    </View>
                    <View style={styles.cardInfoRow}>
                        <ButtonComponent title="Edit" onPress={() => { }} />
                        <ButtonComponent title="Delete" onPress={() => { }} />
                    </View>
                </View>
                <View style={styles.card}>
                    <View style={styles.cardInfoRow}>
                        <Text style={styles.cardDateText}>Usuário:</Text>
                        <Text style={styles.cardDateText}>BRYAN GAY</Text>
                    </View>
                    <View style={styles.cardInfoRow}>
                        <ButtonComponent title="Edit" onPress={() => { }} />
                        <ButtonComponent title="Delete" onPress={() => { }} />
                    </View>
                </View>
                <View style={styles.card}>
                    <View style={styles.cardInfoRow}>
                        <Text style={styles.cardDateText}>Usuário:</Text>
                        <Text style={styles.cardDateText}>BRYAN GAY</Text>
                    </View>
                    <View style={styles.cardInfoRow}>
                        <ButtonComponent title="Edit" onPress={() => { }} />
                        <ButtonComponent title="Delete" onPress={() => { }} />
                    </View>
                </View>
                <View style={styles.card}>
                    <View style={styles.cardInfoRow}>
                        <Text style={styles.cardDateText}>Usuário:</Text>
                        <Text style={styles.cardDateText}>BRYAN GAY</Text>
                    </View>
                    <View style={styles.cardInfoRow}>
                        <ButtonComponent title="Edit" onPress={() => { }} />
                        <ButtonComponent title="Delete" onPress={() => { }} />
                    </View>
                </View>
                <View style={styles.card}>
                    <View style={styles.cardInfoRow}>
                        <Text style={styles.cardDateText}>Usuário:</Text>
                        <Text style={styles.cardDateText}>BRYAN GAY</Text>
                    </View>
                    <View style={styles.cardInfoRow}>
                        <ButtonComponent title="Edit" onPress={() => { }} />
                        <ButtonComponent title="Delete" onPress={() => { }} />
                    </View>
                </View>

            </ScrollView>

            <FooterComponent tipoPerfil="funcionario" />
        </View>
    );
};

export default UsersListView;