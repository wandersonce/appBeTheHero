import React from 'react';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

import styles from './styles'
import logoImg from '../../assets/logo.png'

export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;
    const message = `Hello ${incident.name}, I'm contacting you about the incident ${incident.title}. I would like to help with the value of ${Intl.NumberFormat('en-ca', { style: 'currency', currency: 'CAD' }).format(incident.value)}`

    function navigateBack() {
        navigation.goBack();
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Hero of the incident: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        })
    }
    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}text=${message}`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={20} color="#E82041" />
                </TouchableOpacity>
            </View>
            <View style={styles.incident} >
                <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.name} from {incident.city}-{incident.uf}</Text>

                <Text style={styles.incidentProperty}>INCIDENT:</Text>
                <Text style={styles.incidentValue}>{incident.description}</Text>

                <Text style={styles.incidentProperty}>VALUE:</Text>
                <Text style={styles.incidentValue}>{Intl.NumberFormat('en-ca',
                    {
                        style: 'currency', currency: 'CAD'
                    }).format(incident.value)}</Text>
            </View>
            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Save the day</Text>
                <Text style={styles.heroTitle}>Be the hero of this incident</Text>

                <Text style={styles.heroDescription}>Contact us!</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>Whatsapp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>Email</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}