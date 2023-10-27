import { View, StyleSheet, FlatList, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { Button, Menu, Searchbar } from 'react-native-paper';
import theme from '../theme';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import Text from './Text';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  formContainer: {
    backgroundColor: theme.colors.mainBackground,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background,
  },
  mainContainer: {
    flex: 1,
  },
});

const SearchHeader = ({ refetch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [value] = useDebounce(searchQuery, 500);
  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    async function getData() {
      try {
        await refetch({
          searchKeyword: value,
        });
      } catch (error) {
        console.log(error);
      }
    }

    getData();
  }, [value]);

  return (
    <Searchbar
      style={{
        borderRadius: 5,
        backgroundColor: theme.colors.formBackground,
      }}
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};

const FilterHeader = ({ refetch }) => {
  const [visible, setVisible] = useState(false);
  const [buttonTitle, setButtonTitle] = useState('Latest Repositories');
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleClick = async (title, orderBy, orderDirection) => {
    setButtonTitle(title);
    closeMenu();
    await refetch({
      orderBy,
      orderDirection,
    });
  };

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button
            icon="menu-down"
            contentStyle={{
              flexDirection: 'row-reverse',
              justifyContent: 'space-between',
            }}
            style={{
              marginTop: 20,
            }}
            onPress={openMenu}
          >
            <Text fontSize="heading">{buttonTitle}</Text>
          </Button>
        }
      >
        <Menu.Item title="Select an item..." disabled />
        <Menu.Item
          onPress={() =>
            handleClick('Latest Repositories', 'CREATED_AT', 'DESC')
          }
          title="Latest Repositories"
        />
        <Menu.Item
          onPress={() =>
            handleClick('Highest rated repositories', 'RATING_AVERAGE', 'DESC')
          }
          title="Highest rated repositories"
        />
        <Menu.Item
          onPress={() => {
            handleClick('Lowest rated repositories', 'RATING_AVERAGE', 'ASC');
          }}
          title="Lowest rated repositories"
        />
      </Menu>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, onEndReach }) => {
  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/${item.id}`)}>
          <RepositoryItem key={item.id} item={item} />
        </Pressable>
      )}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const RepositoryList = () => {
  const { repositories, refetch, fetchMore } = useRepository({
    first: 3,
  });

  const onEndReach = () => {
    console.log('fetching more');
    fetchMore();
  };

  return (
    <View>
      <View style={styles.formContainer}>
        <SearchHeader refetch={refetch} />
        <FilterHeader refetch={refetch} />
      </View>
      <RepositoryListContainer
        repositories={repositories}
        onEndReach={onEndReach}
      />
    </View>
  );
};

export default RepositoryList;
