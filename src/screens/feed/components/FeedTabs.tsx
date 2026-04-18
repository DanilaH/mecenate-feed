import React from "react";
import { StyleSheet } from "react-native";
import { TabBar } from "../../../components/TabBar";
import { CenteredContent } from "../../../shared/ui";
import type { Tier } from "../../../types/api";

interface FeedTabsProps {
  activeTier: Tier;
  onSelect: (tier: Tier) => void;
}

export function FeedTabs({ activeTier, onSelect }: FeedTabsProps) {
  return (
    <CenteredContent style={styles.tabShell}>
      <TabBar activeTier={activeTier} onSelect={onSelect} />
    </CenteredContent>
  );
}

const styles = StyleSheet.create({
  tabShell: {
    paddingHorizontal: 20,
  },
});
