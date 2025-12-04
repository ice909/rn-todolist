import { Order } from '@/types';
import { MissionItem } from './MissionItem';
import { StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';

export function List({
  data,
}: {
  data: Order[];
}) {
  const renderItem = ({ item, index }: { item: Order; index: number }) => {
    return <MissionItem item={item} index={index} />;
  };
  return (
    <FlashList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    ></FlashList>
  );
}

StyleSheet.create({
  placeholder: {
    flex: 1,
    marginHorizontal: 12,
    height: '100%',
    backgroundColor: '#EBF1FD',
    borderWidth: 1,
    borderColor: '#DAE2FA',
  },
});
