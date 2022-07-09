import React, { useState, useEffect } from "react";
import StripePayment from "../components/StripePayment";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useRouter } from "next/router";
import useFetch from "use-http";
import apiEndpoints from "../constants/apiEndpoints";
import routes from "../constants/routes";

export default function Home() {
  const [Products, setProducts] = useState([]);
  const [price, setprice] = useState();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const { post } = useFetch(apiEndpoints.STRIPE_API);

  useEffect(() => {
    async function getProducts() {
      await fetch(apiEndpoints.STRIPE_PRODUCTS)
        .then((res) => res.json())
        .then((res) => {
          setProducts(res?.products?.data);
        });
    }
    getProducts();
  }, []);

  return (
    <div>
      {Products?.map((i) => {
        return (
          <>
            <div
              style={{
                display: "inline-block",
                marginLeft: "10%",
                marginBottom: "10%",
              }}
            >
              <h1>{i?.name}</h1>
              <img src={i?.images?.[0]} />
              <br />
              <button
                onClick={() => {
                  post(`prices/${i?.default_price}`)
                    .then((res) => {
                      setprice(res?.unit_amount);
                    })
                    .then(() => {
                      router?.replace(routes.HOME);
                      onOpenModal();
                    });
                }}
              >
                Buy Now
              </button>
              <Modal open={open} onClose={onCloseModal} center>
                <StripePayment item={{ price: price }} />
              </Modal>
            </div>
          </>
        );
      })}
    </div>
  );
}
