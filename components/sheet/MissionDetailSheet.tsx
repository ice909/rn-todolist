import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { useDataStore } from '@/stores/data';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDetailStore } from '@/stores/detail';
import { MissionDetailHandle } from './MissionDetailHandle';

export function MissionDetailSheet() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const selectedTaskId = useDetailStore((state) => state.editingOrderId);
  const closeDetailSheet = useDetailStore((state) => state.closeDetailSheet);
  const missionMap = useDataStore((state) => state.missionMap);
  const insets = useSafeAreaInsets();

  const snapPoints = useMemo(() => ['50%', '100%'], []);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        closeDetailSheet();
      }
    },
    [closeDetailSheet]
  );

  useEffect(() => {
    if (selectedTaskId) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [selectedTaskId]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.2}
      />
    ),
    []
  );

  const deleteOrder = useDataStore((state) => state.deleteOrder);
  const [showMenu, setShowMenu] = useState(false);

  const handleDelete = () => {
    if (selectedTaskId) {
      deleteOrder(selectedTaskId);
      closeDetailSheet();
    }
  };

  const renderHandle = useCallback(
    (props: any) => (
      <MissionDetailHandle
        {...props}
        bottomSheetModalRef={bottomSheetModalRef}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        handleDelete={handleDelete}
        insets={insets}
      />
    ),
    [showMenu, handleDelete, insets]
  );

  const mission = selectedTaskId ? missionMap.get(selectedTaskId) : null;

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      handleComponent={renderHandle}
      enableDynamicSizing={false}
    >
      <BottomSheetView style={styles.contentContainer}>
        {mission ? (
          <View>
            <Text style={styles.title}>{mission.missionTitle}</Text>
            <Text style={styles.content}>{mission.missionContent}</Text>
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: 'flex-start',
    overflow: 'visible',
  },
  fullWidth: {
    width: '100%',
    overflow: 'visible',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
    zIndex: 10,
  },
  iconContainer: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  content: {
    fontSize: 16,
    color: '#666',
  },
});
