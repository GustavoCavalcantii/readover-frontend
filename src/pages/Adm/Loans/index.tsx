import React, { useEffect, useState } from "react";
import * as Style from "./styles";
import Navbar from "../../../components/Navbar/Admin";
import { DeliveryCard } from "../../../components/DeliveryCard";
import { Loan } from "../../../types/services/loan";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoanService } from "../../../services/Loan/LoanService";
import { getImageUrl } from "../../../services/Images/FileUtils";
import { Sidebar } from "../../../components/Sidebar";

const loanStatuses = ["active", "returned", "late", "rejected", "pending"];

const DeliveryTime: React.FC = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [filteredLoans, setFilteredLoans] = useState<Loan[]>([]);

  const [searchInput, setSearchInput] = useState("");
  const [statusInput, setStatusInput] = useState<string>("pending");

  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("pending"); 

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Loans | Readover";
  }, []);

  const handleSearch = () => {
    setSearch(searchInput);
    setSelectedStatus(statusInput);

    const params = new URLSearchParams();
    if (searchInput) params.set("search", searchInput);
    if (statusInput) params.set("status", statusInput);
    setSearchParams(params);
  };

  const toggleLoanStatus = (statusClicked: string) => {
    setStatusInput((prev) => (prev === statusClicked ? "" : statusClicked));
  };

  useEffect(() => {
    const fetchLoans = async () => {
      const response = (await LoanService.getAll()) ?? [];

      const enrichedLoans = await Promise.all(
        response.map(async (loan) => {
          const imageUrl = await getImageUrl(loan.image ?? "", "livro");
          return { ...loan, imageUrl };
        })
      );

      setLoans(enrichedLoans);
    };

    fetchLoans();
  }, []);

  useEffect(() => {
    const filtered = loans.filter(
      (loan) =>
        (!selectedStatus || loan.status === selectedStatus) &&
        loan.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredLoans(filtered);
  }, [search, selectedStatus, loans]);

  useEffect(() => {
    const initialSearch = searchParams.get("search") || "";
    const initialStatus = searchParams.get("status") || "pending";
    setSearchInput(initialSearch);
    setStatusInput(initialStatus);
    setSearch(initialSearch);
    setSelectedStatus(initialStatus);
  }, []); 

  const LoanList: React.FC<{ loans: Loan[] }> = ({ loans }) => (
    <>
      {loans.map((loan) => (
        <DeliveryCard
          key={loan.id}
          title={loan.title}
          borrower={loan.borrower}
          image={loan.imageUrl}
          onClick={() => navigate(`/adm/loan/${loan.id}`)}
          expectedReturnDate={loan.expectedReturnDate}
          status={loan.status}
        />
      ))}
    </>
  );

  return (
    <main style={{ height: "100%" }}>
      <Navbar
        isSearch
        onChange={(e) => setSearchInput(e.target.value)}
        onClick={handleSearch}
        placeholder="Search loans..."
        value={searchInput}
      />
      <Style.AppContainer>
        <Sidebar
          allGenders={loanStatuses}
          selectedGenders={statusInput ? [statusInput] : []}
          onToggleGender={toggleLoanStatus}
        />
        <Style.SearchItemsContainer>
          <div style={{ marginBottom: "1rem" }}>
            Results for: <strong>{search || "All Loans"}</strong> with status:{" "}
            <strong>{selectedStatus || "Any"}</strong>
          </div>

          <Style.Container>
            {filteredLoans.length > 0 ? (
              <LoanList loans={filteredLoans} />
            ) : (
              <div>No Loans Found</div>
            )}
          </Style.Container>
        </Style.SearchItemsContainer>
      </Style.AppContainer>
    </main>
  );
};

export default DeliveryTime;
