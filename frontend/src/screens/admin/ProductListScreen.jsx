import { LinkContainer } from "react-router-bootstrap"
import { Table, Button, Row, Col } from "react-bootstrap"
import { FaEdit, FaTrash } from "react-icons/fa"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import Paginate from "../../components/Paginate"
import { toast } from 'react-toastify'
import { useParams } from "react-router-dom"
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from "../../slices/productsApiSlice"

const ProductListScreen = () => {
  const { pageNumber } = useParams()

  const { data, isLoading, error, refetch } = useGetProductsQuery({pageNumber})

  const products = data?.products || []

  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation()

  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation()

  const deleteHandler = async (id) => {
    if (window.confirm(`Are you sure you wanna delete?`)) {
      try {
        await deleteProduct(id);
        toast.success('Product deleted successfully')
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }
  

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-end'>
          {/* <LinkContainer to={`/admin/product/create`}> */}
            <Button className='btn-sm m-3' onClick={createProductHandler}>
              <FaEdit /> Create Product
            </Button>
          {/* </LinkContainer> */}
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : products.length === 0 ? (
        <Message variant='info'>No products</Message>
          ) : (
        <>
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>PRICE</th>
              <th>COUNT IN STOCK</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>${product.price}</td>
                <td>{product.countInStock}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm mx-2'>
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button variant='danger' className='btn-sm' onClick={()=> deleteHandler(product._id)}>
                    <FaTrash style={{ color: 'white'}} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
                </Table>
                <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default ProductListScreen