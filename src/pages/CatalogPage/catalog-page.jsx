import { useContext, useEffect } from "react";
import CardList from "../../components/CardList/card-list"
import Sort from "../../components/Sort/sort"
import { CardContext } from "../../context/cardContext";
import { SortContext } from "../../context/sortContext";
import { UserContext } from "../../context/userContext";
import api from '../../shared/api';
import { isLiked } from '../../shared/data';

const tabs = [
	{
		id: "cheap",
		title: "Сначала дешёвые",
	},
	{
		id: "low",
		title: "Сначала дорогие",
	},
	{
		id: "sale",
		title: "По скидке",
	}
];

export const CatalogPage = () => {
	const {
		cards,
		setCards,
		setIsLoading,
		setFavorites,
		setSearchQuery
	} = useContext(CardContext);

	const {
		selectedTabId,
		setSelectedTabId
	} = useContext(SortContext);

	const {
		setCurrentUser,
		token
	} = useContext(UserContext);

	useEffect(() => {
		if (!token) {
			return
		}

		setIsLoading(true);
		Promise.all([api.getProductList(), api.getUserInfo()])
			.then(([productsData, userData]) => {
				setCurrentUser(userData);
				setCards(productsData.products);
				const favoriteProducts = productsData.products.filter(item => isLiked(item.likes, userData._id));
				setFavorites(() => favoriteProducts)
			})
			.catch(err => console.log(err))
			.finally(() => {
				setIsLoading(false);
			})
	}, [token])

	useEffect(() => {
		return () => {
			setSearchQuery('')
		}
	}, [setSearchQuery])

	return (
		<>
			<Sort tabs={tabs}
				currentSort={selectedTabId}
				onChangeSort={(tabid) => { setSelectedTabId(tabid) }} />
			<div className='content__cards'>
				<CardList cards={cards} />
			</div>
		</>
	)
}