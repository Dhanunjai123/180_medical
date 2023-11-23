import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface CardProps {
  title: string;
  // children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({title}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default Card;
