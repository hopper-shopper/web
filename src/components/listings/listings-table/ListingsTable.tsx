import { Listing } from "models/Listing"
import * as Table from "components/table/Table"
import { formatDateTime } from "formatters/date"
import { Currency, formatCurrency } from "formatters/currency"
import useSort from "hooks/useSort"
import { SortListingBy, sortListings } from "sorters/listings"
import { SortDirection } from "sorters/_common"
import { styled } from "theme"
import { formatWalletAddress } from "formatters/wallet"

type ListingsTableProps = {
    listings: Listing[]
}

export default function ListingsTable(props: ListingsTableProps) {
    const { listings } = props

    const { sorted: sortedListings } = useSort({
        collection: listings,
        sorter: sortListings,
        initial: {
            by: SortListingBy.TIMESTAMP,
            direction: SortDirection.DESC,
        },
    })

    return (
        <Table.Root>
            <thead>
                <Table.Row>
                    <Table.HeaderCell css={{ width: 100 }} />
                    <Table.HeaderCell align="left">Date</Table.HeaderCell>
                    <Table.HeaderCell align="left">Seller</Table.HeaderCell>
                    <Table.HeaderCell align="left">Buyer</Table.HeaderCell>
                    <Table.HeaderCell align="right">Price</Table.HeaderCell>
                </Table.Row>
            </thead>

            <tbody>
                {sortedListings.map((listing, index) => (
                    <Table.Row key={listing.id} striped={index % 2 === 1}>
                        <Table.Cell>
                            <SoldIndicator
                                state={listing.sold ? "sold" : listing.enabled ? "open" : "closed"}>
                                {listing.sold ? "Sold" : listing.enabled ? "Open" : "Closed"}
                            </SoldIndicator>
                        </Table.Cell>
                        <Table.Cell align="left">{formatDateTime(listing.timestamp)}</Table.Cell>
                        <Table.Cell align="left">{formatWalletAddress(listing.seller)}</Table.Cell>
                        <Table.Cell align="left">{formatWalletAddress(listing.buyer)}</Table.Cell>
                        <Table.Cell align="right">
                            {formatCurrency(listing.price, Currency.AVAX)}
                        </Table.Cell>
                    </Table.Row>
                ))}
            </tbody>
        </Table.Root>
    )
}

const SoldIndicator = styled("div", {
    padding: "0.125rem 0.25rem",
    borderRadius: "$sm",
    fontSize: "0.75rem",
    textAlign: "center",
    variants: {
        state: {
            sold: {
                backgroundColor: "$teal9",
                color: "$teal12",
            },
            open: {
                backgroundColor: "$blue9",
                color: "$blue12",
            },
            closed: {
                backgroundColor: "$red9",
                color: "$red12",
            },
        },
    },
    defaultVariants: {
        state: "open",
    },
})
