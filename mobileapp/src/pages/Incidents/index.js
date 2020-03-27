import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import logoImg from '../../assets/logo.png'
import styles from './styles'

import api from '../../services/api'

export default function Incidents() {
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const navigation = useNavigation();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident });
    }

    async function loadIncidents() {
        if (loading) {
            return;
        } else if (total > 0 && incidents.length == total) {
            return;
        }

        setLoading(true);

        const res = await api.get('incidents', {
            params: { page }
        })

        setIncidents([...incidents, ...res.data]);
        setTotal(res.headers['x-total-count']);
        setPage(page + 1)
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total of <Text style={styles.headerTextBold}>{total} incidents.</Text>
                </Text>
            </View>
            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.description}>Choose an incident above and help!</Text>

            <FlatList
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>INCIDENT:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALUE:</Text>
                        <Text style={styles.incidentValue}>{Intl.NumberFormat('en-ca',
                            {
                                style: 'currency', currency: 'CAD'
                            }).format(incident.value)}</Text>

                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() => navigateToDetail(incident)}>

                            <Text style={styles.detailButtonText}>See more details</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>

                    </View>
                )}
            />
        </View>
    );
}