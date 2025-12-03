import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { db } from '@/db/db';
import { localOrderTable } from '@/db/schema/localOrders';
import { localMissionTable } from '@/db/schema/localMissions';

export default function DbViewer() {
  const [orders, setOrders] = useState<any[]>([]);
  const [missions, setMissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const dbOrders = await db.select().from(localOrderTable);
      const dbMissions = await db.select().from(localMissionTable);

      setOrders(dbOrders);
      setMissions(dbMissions);
    } catch (error) {
      console.error('DB Read Error:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load(); // auto load first time
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Database Viewer</Text>

      <TouchableOpacity style={styles.reloadBtn} onPress={load}>
        <Text style={styles.reloadText}>
          {loading ? 'Loading...' : 'Reload Data'}
        </Text>
      </TouchableOpacity>

      {/* Orders */}
      <View style={styles.block}>
        <Text style={styles.blockTitle}>localOrders ({orders.length})</Text>
        {orders.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.json}>{JSON.stringify(item, null, 2)}</Text>
          </View>
        ))}
      </View>

      {/* Missions */}
      <View style={styles.block}>
        <Text style={styles.blockTitle}>
          localMissions ({missions.length})
        </Text>
        {missions.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.json}>{JSON.stringify(item, null, 2)}</Text>
          </View>
        ))}
      </View>

      <View style={{ height: 60 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  block: {
    marginTop: 16,
  },
  blockTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  item: {
    backgroundColor: '#f6f6f6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  json: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#333',
  },
  reloadBtn: {
    backgroundColor: '#007aff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  reloadText: {
    color: 'white',
    fontSize: 16,
  },
});
