import React, { useEffect, useState } from "react";
import {
  getQuotationByVendor,
  getQuotationByVendorByStatus,
} from "./api-vendorQuotation";
import TableHeader from "../../components/TableHeader/TableHeader";
import CsvImport from "components/CsvImport";
import Pagination from "../../components/Pagination/Pagination";
import { formatDate, numberWithCommas } from "../../helpers";
import ExcelComponet from "../../components/ExecelComponent";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Table,
  ButtonGroup,
  Modal,
  Form,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { trackPromise } from "react-promise-tracker";
import DayPickerInput from "react-day-picker/DayPickerInput";

const STATUS = {
  APPROVED: "aprroved",
  REJECTED: "Rejected",
  ALL: "all",
  PENDING: "Pending",
};

let ITEMS_PER_PAGE = 10;

const RejectedQuotation = () => {
  const [vendorQuotation, setVendorQuotation] = useState([]);
  const [variableData, setVariableData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [totalItems, setTotaltems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [appprovedStatus, setApprovedStatus] = useState(STATUS.ALL);
  const [filterDate, setFileterDate] = useState(0);
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [execelData, setExecelData] = useState();
  const [startingDate, setStartingDate] = useState();
  const [endingDate, setEndingDate] = useState();

  const fetchVedorQuotation = () => {
    trackPromise(
      getQuotationByVendorByStatus("Rejected")
        .then((res) => {
          console.log("response", res);
          console.log("Vendor data", res.data);
          setVendorQuotation(res.data);
          if (res.data) {
            let realData = res.data.map((i) => ({
              approvalComment: i.approvalComment,
              approvalDate: i.approvalDate,
              approvedBy: i.approvedBy,
              caseId: i.caseId,
              comment: i.comment,
              createdAt: i.createdAt,
              createdBy: i.createdBy,
              createdOn: i.createdOn,
              deliveryDate: i.deliveryDate,
              totalAmount: i.totalAmount,
              status: i.status,
              orderId: i.orderId,
              paymnentStatus: i.paymnentStatus,
              processStatus: i.processStatus,
              processStatusInvoice: i.processStatusInvoice,
              processStatusPaymnent: i.processStatusPaymnent,
            }));

            setExecelData(realData);
          }
          setVariableData(res.data);
        })
        .catch((error) => console.log(error, "err in fetch"))
    );
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    fetchVedorQuotation(signal);
    // setVendorQuotation(dummy);
  }, []);

  useEffect(() => {
    console.log();
    if (startingDate && endingDate) {
      console.log("in staing and");
      let newData = vendorQuotation.filter((i) => {
        console.log(
          new Date(i.approvalDate).set >= startingDate &&
            new Date(i.approvalDate) <= endingDate,
          "ooo"
        );
        return (
          formatDate(i.approvalDate) >= formatDate(startingDate) &&
          formatDate(i.approvalDate) <= formatDate(endingDate)
        );
      });

      setVariableData(newData);
    }

    if (startingDate && !endingDate) {
      console.log("in staing and 11", startingDate);
      let newData = vendorQuotation.filter((i) => {
        console.log(startingDate >= new Date(i.approvalDate), "iiii");
        return formatDate(i.approvalDate) >= formatDate(startingDate);
      });

      setVariableData(newData);
    }

    if (!startingDate && endingDate) {
      console.log("in staing and33");
      let newData = vendorQuotation.filter((i) => {
        console.log(
          new Date(i.approvalDate) <= formatDate(endingDate),
          "make proun"
        );
        return formatDate(i.approvalDate) <= formatDate(endingDate);
      });

      setVariableData(newData);
    }
  }, [startingDate, endingDate]);

  useEffect(() => {
    setTotaltems(variableData.length);
    let lastIndex = currentPage * ITEMS_PER_PAGE;
    let startIndex = lastIndex - ITEMS_PER_PAGE;
    let newData = variableData.slice(startIndex, lastIndex);
    setDisplayData(newData);
  }, [currentPage, variableData, vendorQuotation]);

  const headers = [
    { name: "SN", field: "id" },
    { name: "Case Id", field: "", sortable: false },
    { name: "Total Amount", field: "hod", sortable: true },
    // { name: "Vendor Email", field: "unit", sortable: true },
    // { name: "Vendor Name", field: "hod", sortable: true },
    { name: "Rejected By", field: "hod", sortable: true },
    { name: "Comments", field: "unit", sortable: true },
    { name: "Rejected Date", field: "hod", sortable: true },
  ];
  return (
    <div>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <Card.Title as="h4">Rejected Quotations</Card.Title>

                <ExcelComponet
                  execelData={execelData}
                  name={"Rejected Quotations"}
                />
              </Card.Header>
              <Card.Body>
                <p className="d-flex justify-content-center">Filter By</p>
                <Row className="d-flex justify-content-center">
                  <Col sm={6} md={3}>
                    <Form.Group controlId="caseId">
                      <Form.Label>Starting Date</Form.Label>
                      <DayPickerInput
                        style={{}}
                        value={startingDate}
                        onDayChange={(e) => setStartingDate(new Date(e))}
                        placeholder="DD/MM/YYYY"
                        format="DD/MM/YYYY"
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6} md={3}>
                    <Form.Group controlId="caseId">
                      <Form.Label>Ending Date</Form.Label>
                      <DayPickerInput
                        style={{ display: "block", padding: "6 12" }}
                        value={endingDate}
                        onDayChange={(e) => setEndingDate(new Date(e))}
                        placeholder="DD/MM/YYYY"
                        format="DD/MM/YYYY"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="d-flex justify-content-center"></div>
                <div className="d-flex justify-content-center">
                  <Pagination
                    total={totalItems}
                    itemsPerPage={ITEMS_PER_PAGE}
                    currentPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                </div>
                <Table responsive>
                  <TableHeader
                    headers={headers}
                    onSorting={(field, order) => setSorting({ field, order })}
                  />
                  <tbody>
                    {displayData.map((item, index) => {
                      console.log(item);
                      return (
                        <tr key={index}>
                          <td>
                            {index +
                              1 * (ITEMS_PER_PAGE * (currentPage - 1)) +
                              1}
                          </td>
                          <td>{item.caseId}</td>
                          <td>{numberWithCommas(item.totalAmount)}</td>
                          {/* <td>{item.email}</td>
                          <td>{item.name}</td> */}

                          <td>{item.approvedBy}</td>
                          <td>{item.comment}</td>
                          <td>
                            {new Date(item.approvalDate).toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RejectedQuotation;
