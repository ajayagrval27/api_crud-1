import React from "react"
import { Card as BootstrapCard, Col, Container, Row } from "react-bootstrap"
import { motion } from "framer-motion"

export const MyCard = () => {
    const animationConfiguration = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    }
    return (
        <>
            <motion.div
                variants={animationConfiguration}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}>
                <Container className="mt-5">
                    <h2>Card </h2>
                    <Row>
                        <Col>
                            <BootstrapCard style={{ width: "18rem" }}>
                                <BootstrapCard.Body>
                                    <BootstrapCard.Title>
                                        Card Title
                                    </BootstrapCard.Title>
                                    <BootstrapCard.Subtitle className="mb-2 text-muted">
                                        Card Subtitle
                                    </BootstrapCard.Subtitle>
                                    <BootstrapCard.Text>
                                        Some quick example text to build on the
                                        card title and make up the bulk of the
                                        card's content.
                                    </BootstrapCard.Text>
                                    <BootstrapCard.Link href="#">
                                        Card Link
                                    </BootstrapCard.Link>
                                    <BootstrapCard.Link href="#">
                                        Another Link
                                    </BootstrapCard.Link>
                                </BootstrapCard.Body>
                            </BootstrapCard>
                        </Col>
                        <Col>
                            <BootstrapCard style={{ width: "18rem" }}>
                                <BootstrapCard.Body>
                                    <BootstrapCard.Title>
                                        Card Title
                                    </BootstrapCard.Title>
                                    <BootstrapCard.Subtitle className="mb-2 text-muted">
                                        Card Subtitle
                                    </BootstrapCard.Subtitle>
                                    <BootstrapCard.Text>
                                        Some quick example text to build on the
                                        card title and make up the bulk of the
                                        card's content.
                                    </BootstrapCard.Text>
                                    <BootstrapCard.Link href="#">
                                        Card Link
                                    </BootstrapCard.Link>
                                    <BootstrapCard.Link href="#">
                                        Another Link
                                    </BootstrapCard.Link>
                                </BootstrapCard.Body>
                            </BootstrapCard>
                        </Col>
                        <Col>
                            <BootstrapCard style={{ width: "18rem" }}>
                                <BootstrapCard.Body>
                                    <BootstrapCard.Title>
                                        Card Title
                                    </BootstrapCard.Title>
                                    <BootstrapCard.Subtitle className="mb-2 text-muted">
                                        Card Subtitle
                                    </BootstrapCard.Subtitle>
                                    <BootstrapCard.Text>
                                        Some quick example text to build on the
                                        card title and make up the bulk of the
                                        card's content.
                                    </BootstrapCard.Text>
                                    <BootstrapCard.Link href="#">
                                        Card Link
                                    </BootstrapCard.Link>
                                    <BootstrapCard.Link href="#">
                                        Another Link
                                    </BootstrapCard.Link>
                                </BootstrapCard.Body>
                            </BootstrapCard>
                        </Col>
                    </Row>
                </Container>
            </motion.div>
        </>
    )
}
