import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
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
import { useTaskStore } from '@/stores/task';

export function MissionDetailSheet() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const editingOrderId = useDetailStore((state) => state.editingOrderId);
  const editingOrder = useDetailStore((state) => state.editingOrder);
  const closeDetailSheet = useDetailStore((state) => state.closeDetailSheet);
  const missionMap = useDataStore((state) => state.missionMap);
  const orderMap = useDataStore((state) => state.orderMap);
  const toggleDoneOrder = useTaskStore((state) => state.toggleDoneOrder);
  const saveMission = useTaskStore((state) => state.saveMission);
  const saveOrders = useTaskStore((state) => state.saveOrders);
  const insets = useSafeAreaInsets();
  const updateMission = useDataStore((state) => state.updateMissionMap);
  const titleInputRef = useRef<TextInput>(null);

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

  const [showMenu, setShowMenu] = useState(false);

  const handleDelete = () => {
    if (editingOrder) {
      editingOrder.deleted = true;
      saveOrders([editingOrder]);
      closeDetailSheet();
    }
  };

  function handleCheckboxChange(checked: boolean) {
    if (editingOrder) {
      editingOrder.itemType =
        editingOrder?.itemType === MissionType.NOT_DONE
          ? MissionType.DONE
          : MissionType.NOT_DONE;
      toggleDoneOrder(editingOrder);
    }
  }

  function handlePriorityChange(priority: number) {
    if (editingOrderId) {
      if (!mission) return;
      saveMission([{ ...mission, missionPriorityId: priority }]);
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

  const onInputFocus = () => {
    bottomSheetModalRef.current?.snapToIndex(1);
  };

  const onChangeTitle = (text: string) => {
    if (!mission) return;
    if (text !== mission?.missionTitle) {
      updateMission([
        {
          ...mission,
          missionTitle: text,
        },
      ]);
    }
  };

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
            <TextInput
              ref={titleInputRef}
              style={styles.title}
              placeholder="准备做什么？"
              placeholderTextColor="#D9D9D9"
              onFocus={onInputFocus}
              value={mission.missionTitle}
              onChangeText={onChangeTitle}
            />
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
