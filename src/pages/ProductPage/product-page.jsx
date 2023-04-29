import { useContext } from "react"
import { useCallback } from "react"
import { useParams } from "react-router-dom"
import { NotFound } from "../../components/NotFound/NotFound"
import { Product } from "../../components/Product/product"
import Spinner from "../../components/Spinner"
import { CardContext } from "../../context/cardContext"
import { useApi } from "../../hooks/useApi"
import api from "../../shared/api"

export const ProductPage = ({token}) => {
  const { productId } = useParams();
  const { handleLike } = useContext(CardContext);

  const handleGetProduct = useCallback(() => {
    return api.getProductById(productId)
  }, [productId, token]);

  const {
    data: product,
    setData: setProduct,
    loading: isLoading,
    error: errorState
  } = useApi(handleGetProduct)

  const handleProductLike = useCallback(() => {
    handleLike(product).then((updateProduct) => {
      setProduct(updateProduct);
    });
  }, [product, handleLike, setProduct])

  return (
    <>
      <div className='content__cards'>
        {isLoading
          ? <Spinner />
          : !errorState && <Product {...product} setProduct={setProduct} onProductLike={handleProductLike} />
        }
        {!isLoading && errorState && <NotFound />}
      </div>
    </>
  )
}