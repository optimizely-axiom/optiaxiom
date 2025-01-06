import { Avatar, Box, Flex, Heading, Skeleton, Text } from "@optiaxiom/react";

export function App({ loading = true }: { loading: boolean }) {
  return (
    <Box bg="bg.default" maxW="sm" p="16" rounded="sm" shadow="sm" w="full">
      <Flex alignItems="start" flexDirection="row">
        {loading ? (
          <Skeleton>
            <Avatar size="lg" />
          </Skeleton>
        ) : (
          <Avatar name="Sample Person" size="lg" />
        )}

        <Flex flex="1">
          <Heading level="3">
            {loading ? <Skeleton /> : "Lorem ipsum dolor"}
          </Heading>
          <Text asChild fontSize="sm">
            <span>{loading ? <Skeleton w="1/3" /> : "Nullam rhoncus"}</span>
          </Text>
          <Text>
            {loading ? <Skeleton /> : "Phasellus efficitur feugiat luctus et."}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}
