import { useEffect, useState } from "react";
import { CustomLineChart } from "./lineChart";
import { Container, Form } from "semantic-ui-react";

export function ChartView({
    apiData,
    selectedRevenueTypesHome
}) {

    const [filteredData, setFilteredData] = useState([])

    const [monthOptions, setMonthOptions] = useState([])
    const [revenueTypeOptions, setRevenueTypeOptions] = useState([])
    const [productTypeOptions, setProductTypeOptions] = useState([])

    const [selectedMonths, setSelectedMonths] = useState([])
    const [selectedRevenueTypes, setSelectedRevenueTypes] = useState([])
    const [selectedProductTypes, setSelectedProductTypes] = useState([])

    const populateOptions = (data) => {
        if (data && data.length) {

            let tempMonthOptions = []
            let tempRevenueTypeOptions = []
            let tempProductTypeOptions = []

            data.map((d, dIndex) => {

                if (!tempMonthOptions.includes(d.month)) {
                    tempMonthOptions.push(d.month)
                }

                if (!tempProductTypeOptions.includes(d.product)) {
                    tempProductTypeOptions.push(d.product)
                }

                if (!tempRevenueTypeOptions.includes(d.revenue_type)) {
                    tempRevenueTypeOptions.push(d.revenue_type)
                }
            })

            setMonthOptions(
                tempMonthOptions.map((element, index) => {
                    return {
                        text: element,
                        value: element,
                        key: `month_${index}`
                    }
                })
            )
            setRevenueTypeOptions(
                tempRevenueTypeOptions.map((element, index) => {
                    return {
                        text: element,
                        value: element,
                        key: `month_${index}`
                    }
                })
            )
            setProductTypeOptions(
                tempProductTypeOptions.map((element, index) => {
                    return {
                        text: element,
                        value: element,
                        key: `month_${index}`
                    }
                })
            )
        }
    }

    const applyFilters = () => {
        let tempFilteredData = [...apiData]

        if (selectedMonths.length) {
            tempFilteredData = tempFilteredData.filter(element => selectedMonths.includes(element.month))
        }

        if (selectedProductTypes.length) {
            tempFilteredData = tempFilteredData.filter(element => selectedProductTypes.includes(element.product))
        }

        if (selectedRevenueTypes.length) {
            tempFilteredData = tempFilteredData.filter(element => selectedRevenueTypes.includes(element.revenue_type))
        }

        setFilteredData([...tempFilteredData])
    }

    useEffect(() => {
        populateOptions(apiData)
        setFilteredData([...apiData])
    }, [apiData])

    useEffect(() => {
        applyFilters()
    }, [
        selectedMonths,
        selectedRevenueTypes,
        selectedProductTypes
    ])

    useEffect(() => {
        if(selectedRevenueTypesHome && selectedRevenueTypesHome.length) {
            setSelectedRevenueTypes([...selectedRevenueTypesHome])
        }
    }, [selectedRevenueTypesHome])

    return (
        <Container>
            <Form>
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>Select Month(s)</label>
                        <Form.Select
                            multiple
                            placeholder="Months"
                            options={monthOptions}
                            onChange={(_e, {value}) => setSelectedMonths(value)}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Select Product(s)</label>
                        <Form.Select
                            multiple
                            placeholder="Products"
                            options={productTypeOptions}
                            onChange={(_e, {value}) => setSelectedProductTypes(value)}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Select Revenue Type(s)</label>
                        <Form.Select
                            multiple
                            value={selectedRevenueTypes}
                            placeholder="Revenue Types"
                            options={revenueTypeOptions}
                            onChange={(_e, {value}) => setSelectedRevenueTypes(value)}
                        />
                    </Form.Field>
                </Form.Group>
            </Form>
            <CustomLineChart
                chartData={filteredData}
            />
        </Container>
    )
}