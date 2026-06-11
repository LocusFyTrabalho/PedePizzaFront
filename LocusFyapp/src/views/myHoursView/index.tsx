import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { ChevronLeft, ChevronRight, Clock, MapPin, MoreHorizontal } from "lucide-react-native";
import { styles } from "./styles";
import  FooterComponent  from "@/components/footer";

const MyHoursView = () => {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.titleRow}>
                    <Text style={styles.logoText}>My Hours</Text>
                    <TouchableOpacity style={styles.iconButton}>
                        <MoreHorizontal size={28} color="#1A1A1A" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.userNameText}>John Rodrigues</Text>
            </View>

            <View style={styles.weekSelectorContainer}>
                <TouchableOpacity style={styles.arrowButton}>
                    <ChevronLeft size={20} color="#1A1A1A" />
                </TouchableOpacity>
                <Text style={styles.weekText}>Week 1</Text>
                <TouchableOpacity style={styles.arrowButton}>
                    <ChevronRight size={20} color="#1A1A1A" />
                </TouchableOpacity>
            </View>

            <View style={styles.summaryContainer}>
                <View style={styles.summaryBlock}>
                    <Text style={styles.summaryLabel}>Total hours</Text>
                    <Text style={styles.summaryValue}>15h 24m</Text>
                </View>
                <View style={styles.summaryBlock}>
                    <Text style={styles.summaryLabel}>Estimated pay</Text>
                    <Text style={styles.summaryValue}>$ 300.80</Text>
                </View>
            </View>

            <ScrollView
                style={styles.cardsContainer}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.card}>
                    <Text style={styles.cardDateText}>Monday - March 8</Text>

                    <View style={styles.cardInfoRow}>
                        <Clock size={20} color="#1A1A1A" style={styles.cardIcon} />
                        <Text style={styles.cardMainText}>07:12</Text>
                    </View>

                    <View style={styles.cardInfoRow}>
                        <MapPin size={20} color="#1A1A1A" style={styles.cardIcon} />
                        <Text style={styles.cardSubText}>Concord Street</Text>
                    </View>

                    <View style={[styles.statusBadge, styles.badgePaid]}>
                        <View style={[styles.badgeDot, styles.dotPaid]} />
                        <Text style={styles.badgeText}>Paid</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardDateText}>Monday - March 8</Text>

                    <View style={styles.cardInfoRow}>
                        <Clock size={20} color="#1A1A1A" style={styles.cardIcon} />
                        <Text style={styles.cardMainText}>07:12</Text>
                    </View>

                    <View style={styles.cardInfoRow}>
                        <MapPin size={20} color="#1A1A1A" style={styles.cardIcon} />
                        <Text style={styles.cardSubText}>Concord Street</Text>
                    </View>

                    <View style={[styles.statusBadge, styles.badgePaid]}>
                        <View style={[styles.badgeDot, styles.dotPaid]} />
                        <Text style={styles.badgeText}>Paid</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardDateText}>Monday - March 8</Text>

                    <View style={styles.cardInfoRow}>
                        <Clock size={20} color="#1A1A1A" style={styles.cardIcon} />
                        <Text style={styles.cardMainText}>07:12</Text>
                    </View>

                    <View style={styles.cardInfoRow}>
                        <MapPin size={20} color="#1A1A1A" style={styles.cardIcon} />
                        <Text style={styles.cardSubText}>Concord Street</Text>
                    </View>

                    <View style={[styles.statusBadge, styles.badgePaid]}>
                        <View style={[styles.badgeDot, styles.dotPaid]} />
                        <Text style={styles.badgeText}>Paid</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardDateText}>Tuesday - March 9</Text>

                    <View style={styles.cardInfoRow}>
                        <Clock size={20} color="#1A1A1A" style={styles.cardIcon} />
                        <Text style={styles.cardMainText}>07:12</Text>
                    </View>

                    <View style={styles.cardInfoRow}>
                        <MapPin size={20} color="#1A1A1A" style={styles.cardIcon} />
                        <Text style={styles.cardSubText}>Concord Street</Text>
                    </View>

                    <View style={[styles.statusBadge, styles.badgeUnpaid]}>
                        <View style={[styles.badgeDot, styles.dotUnpaid]} />
                        <Text style={styles.badgeText}>Unpaid</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardDateText}>Tuesday - March 9</Text>

                    <View style={styles.cardInfoRow}>
                        <Clock size={20} color="#1A1A1A" style={styles.cardIcon} />
                        <Text style={styles.cardMainText}>07:12</Text>
                    </View>

                    <View style={styles.cardInfoRow}>
                        <MapPin size={20} color="#1A1A1A" style={styles.cardIcon} />
                        <Text style={styles.cardSubText}>Concord Street</Text>
                    </View>

                    <View style={[styles.statusBadge, styles.badgeUnpaid]}>
                        <View style={[styles.badgeDot, styles.dotUnpaid]} />
                        <Text style={styles.badgeText}>Unpaid</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardDateText}>Tuesday - March 9</Text>

                    <View style={styles.cardInfoRow}>
                        <Clock size={20} color="#1A1A1A" style={styles.cardIcon} />
                        <Text style={styles.cardMainText}>07:12</Text>
                    </View>

                    <View style={styles.cardInfoRow}>
                        <MapPin size={20} color="#1A1A1A" style={styles.cardIcon} />
                        <Text style={styles.cardSubText}>Concord Street</Text>
                    </View>

                    <View style={[styles.statusBadge, styles.badgeUnpaid]}>
                        <View style={[styles.badgeDot, styles.dotUnpaid]} />
                        <Text style={styles.badgeText}>Unpaid</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardDateText}>Tuesday - March 9</Text>

                    <View style={styles.cardInfoRow}>
                        <Clock size={20} color="#1A1A1A" style={styles.cardIcon} />
                        <Text style={styles.cardMainText}>07:12</Text>
                    </View>

                    <View style={styles.cardInfoRow}>
                        <MapPin size={20} color="#1A1A1A" style={styles.cardIcon} />
                        <Text style={styles.cardSubText}>Concord Street</Text>
                    </View>

                    <View style={[styles.statusBadge, styles.badgeUnpaid]}>
                        <View style={[styles.badgeDot, styles.dotUnpaid]} />
                        <Text style={styles.badgeText}>Unpaid</Text>
                    </View>
                </View>
            </ScrollView>

            <FooterComponent />
        </View>
    );
};

export default MyHoursView;