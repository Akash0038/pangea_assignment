import { useEffect, useState } from "react";
import { Form, Segment, Table } from "semantic-ui-react";

export function CustomTable({
    records,
    selectedRevenueTypesHome
}) {

    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])

    const [monthOptions, setMonthOptions] = useState([])
    const [postingPeriodOptions, setPostingPeriodOptions] = useState([])

    const [selectedMonths, setSelectedMonths] = useState([])
    const [selectedRevenueTypes, setSelectedRevenueTypes] = useState([])
    const [selectedPostingPeriods, setSelectedPostingPeriods] = useState([])

    const populateOptions = (data) => {
        let tempMonthOptions = []
        let tempPostingPeriodOptions = []

        data.map((d, index) => {
            if(!tempMonthOptions.includes(d.month)) {
                tempMonthOptions.push(d.month)
            }
            if(!tempPostingPeriodOptions.includes(d.year.toString() + "-" + d.month)) {
                tempPostingPeriodOptions.push(d.year.toString() + "-" + d.month)
            }
        })

        setMonthOptions([...tempMonthOptions])
        setPostingPeriodOptions([...tempPostingPeriodOptions])
    }

    const applyFilters = () => {

        let tempFilteredData = [...data]

        if(selectedMonths && selectedMonths.length) {
            tempFilteredData = tempFilteredData.filter(element => selectedMonths.includes(element.month))
        }

        if(selectedPostingPeriods && selectedPostingPeriods.length) {
            tempFilteredData = tempFilteredData.filter(element => selectedPostingPeriods.includes((element.year.toString() + "-" + element.month)))
        }

        if(selectedRevenueTypes && selectedRevenueTypes.length) {
            tempFilteredData = tempFilteredData.filter(element => selectedRevenueTypes.includes(element.revenue_type))
        }

        setFilteredData([...tempFilteredData])
    }

    useEffect(() => {
        applyFilters()
    }, [
        selectedMonths,
        selectedRevenueTypes,
        selectedPostingPeriods
    ])

    useEffect(() => {
        if(records && records.length) {
            setData([...records])
            setFilteredData([...records])

            populateOptions(records)
        }
        
    }, [records])

    useEffect(() => {
        if(selectedRevenueTypesHome && selectedRevenueTypesHome.length) {
            setSelectedRevenueTypes([...selectedRevenueTypesHome])
        }
    }, [selectedRevenueTypesHome])

    return (
        <Segment basic>
            <Form>
                <Form.Group>
                    <Form.Field>
                        <label>Select Month(s)</label>
                        <Form.Select
                            multiple
                            options={monthOptions.map((mo, index) => {
                                return {
                                    text: mo,
                                    value: mo,
                                    key: `month_${index}`
                                }
                            })}
                            placeholder="Months"
                            onChange={(_e, {value}) => setSelectedMonths([...value])}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Select Posting Period(s)</label>
                        <Form.Select
                            multiple
                            options={postingPeriodOptions.map((ppo, index) => {
                                return {
                                    text: ppo,
                                    value: ppo,
                                    key: `posting_period_${index}`
                                }
                            })}
                            placeholder="Posting Periods"
                            onChange={(_e, {value}) => setSelectedPostingPeriods([...value])}
                        />
                    </Form.Field>
                </Form.Group>
            </Form>
            <Table celled padded>
                <Table.Header>
                    <Table.Row style={{backgroundColor: "#094a81"}}>
                        <Table.HeaderCell style={{backgroundColor: "#094a81", color: "#ffffff"}}>S_no</Table.HeaderCell>
                        <Table.HeaderCell style={{backgroundColor: "#094a81", color: "#ffffff"}}>Line_of_business</Table.HeaderCell>
                        <Table.HeaderCell style={{backgroundColor: "#094a81", color: "#ffffff"}}>Revenue_type</Table.HeaderCell>
                        <Table.HeaderCell style={{backgroundColor: "#094a81", color: "#ffffff"}}>Product</Table.HeaderCell>
                        <Table.HeaderCell style={{backgroundColor: "#094a81", color: "#ffffff"}}>Posting period</Table.HeaderCell>
                        <Table.HeaderCell style={{backgroundColor: "#094a81", color: "#ffffff"}}>Acv</Table.HeaderCell>
                        <Table.HeaderCell style={{backgroundColor: "#094a81", color: "#ffffff"}}>Tcv</Table.HeaderCell>
                        <Table.HeaderCell style={{backgroundColor: "#094a81", color: "#ffffff"}}>Revenue</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {filteredData.map((rec, index) => (
                        <Table.Row key={`row_${index}`}>
                            <Table.Cell key={`row_cell_${index}_0`}>{rec.S_no}</Table.Cell>
                            <Table.Cell key={`row_cell_${index}_1`}>{rec.line_of_business}</Table.Cell>
                            <Table.Cell key={`row_cell_${index}_2`}>{rec.revenue_type}</Table.Cell>
                            <Table.Cell key={`row_cell_${index}_3`}>{rec.product}</Table.Cell>
                            <Table.Cell key={`row_cell_${index}_4`}>{rec.year}-{rec.month}</Table.Cell>
                            <Table.Cell key={`row_cell_${index}_5`}>{rec.acv}</Table.Cell>
                            <Table.Cell key={`row_cell_${index}_6`}>{rec.tcv}</Table.Cell>
                            <Table.Cell key={`row_cell_${index}_7`}>{rec.revenue}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

        </Segment>
    )
}