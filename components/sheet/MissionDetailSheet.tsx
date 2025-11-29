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
import { Checkbox } from '../checkbox/CheckBox';
import { MissionType } from '@/types';
import { PrioritySelect } from '../PrioritySelect';

export function MissionDetailSheet() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const editingOrderId = useDetailStore((state) => state.editingOrderId);
  const closeDetailSheet = useDetailStore((state) => state.closeDetailSheet);
  const missionMap = useDataStore((state) => state.missionMap);
  const orderMap = useDataStore((state) => state.orderMap);
  const updateOrderType = useDataStore((state) => state.updateOrderType);
  const updateMissionPriority = useDataStore(
    (state) => state.updateMissionPriority
  );
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
    if (editingOrderId) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [editingOrderId]);

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
    if (editingOrderId) {
      deleteOrder(editingOrderId);
      closeDetailSheet();
    }
  };

  function handleCheckboxChange(checked: boolean) {
    if (editingOrderId) {
      updateOrderType(
        editingOrderId,
        checked ? MissionType.DONE : MissionType.NOT_DONE
      );
    }
  }

  function handlePriorityChange(priority: number) {
    if (editingOrderId) {
      updateMissionPriority(editingOrderId, priority);
    }
  }

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

  const mission = editingOrderId ? missionMap.get(editingOrderId) : null;

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
            <View style={styles.topRow}>
              <View style={{ padding: 8 }}>
                <Checkbox
                  size={22}
                  checked={
                    !!(
                      editingOrderId &&
                      orderMap.get(editingOrderId)?.itemType ===
                        MissionType.DONE
                    )
                  }
                  onChange={handleCheckboxChange}
                />
              </View>

              <PrioritySelect
                priority={mission.missionPriorityId}
                onChange={handlePriorityChange}
              />
            </View>
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
