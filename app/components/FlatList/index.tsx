import { backgroundColor } from '@constants';
import React from 'react';
import { ActivityIndicator, ListRenderItem, FlatList as RNFlatList, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

/**
 * Props for the FlatList component.
 */
interface FlatListProps<T> {
  style?: StyleProp<ViewStyle>; // Custom style to be applied to the FlatList.
  styleItem?: StyleProp<ViewStyle>; // Custom style to be applied to each item in the FlatList.
  data: Array<T>; // The array of data to be rendered in the FlatList.
  renderItem: ListRenderItem<T>; // The function that renders each item in the FlatList.
  onEndReached?: () => void; // Function called when the end of the list is reached.
  onEndReachedThreshold?: number; // Threshold in pixels for calling onEndReached.
  isLoading?: boolean; // Indicates whether the data is currently loading.
  keyExtractor?: (item: T, index: number) => string; // Function to extract a unique key for each item.
}

/**
 * A custom FlatList component with lazy loading support and loading animation.
 */
export function FlatList<T>({
  style,
  data,
  renderItem,
  onEndReached,
  onEndReachedThreshold = 0.5,
  isLoading = false,
  keyExtractor,
  ...props
}: FlatListProps<T>) {
  const renderFooter = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={backgroundColor.backgroundDialog} />
        </View>
      );
    }

    return null;
  };

  return (
    <RNFlatList
      style={style}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      ListFooterComponent={renderFooter}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
});
