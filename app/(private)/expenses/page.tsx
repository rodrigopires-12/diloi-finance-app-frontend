"use client";
import React, { useState, useEffect } from "react";

import api from "@/utils/api"; // Import the api helper
import { toast } from "react-toastify";

type Expense = {
  id: string; // Assuming the id is a string, but it could also be a number
  date: string; // Date in 'YYYY-MM-DD' format
  title: string;
  category: string;
  expense_type: string;
  status: string;
  amount: number;
  installments: number;
  bank: string;
  comments: string; // Optional, if your backend allows null values
  tags: string; // Optional, depending on your use case
  payment_type: string; // 'Cash', 'Credit', or 'Debit'
};

const ExpensesPage: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [newExpense, setNewExpense] = useState<Partial<Expense>>({
    date: new Date().toISOString().split("T")[0],
    title: "",
    category: "",
    expense_type: "",
    status: "",
    amount: 0,
    installments: 1,
    bank: "",
    payment_type: "",
    comments: "",
    tags: "",
  });

  // Fetch expenses on component mount
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await api.get("/api/v1/expenses");
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, [modalOpen, addModalOpen]);

  const openModal = (expense: Expense) => {
    setSelectedExpense(expense);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedExpense(null);
    setModalOpen(false);
  };

  const openAddModal = () => {
    setNewExpense({
      date: new Date().toISOString().split("T")[0],
      title: "",
      category: "",
      expense_type: "",
      status: "",
      amount: 0,
      installments: 1,
      bank: "",
      payment_type: "",
      comments: "",
      tags: "",
    });
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  const saveNewExpense = async () => {
    if (
      newExpense.title &&
      newExpense.category &&
      newExpense.date &&
      newExpense.amount !== undefined
    ) {
      try {
        await api.post("/api/v1/expenses", newExpense);
        alert("Despesa salva com sucesso!");
        closeAddModal();
      } catch (error) {
        console.error("Error saving expense:", error);
        alert("There was an error saving the expense.");
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/api/v1/expenses/${id}/`);
      alert("Despesa excluída!");
      closeModal();
    } catch (error) {
      alert("Erro ao excluir despesa");
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains("overlay")) {
      closeModal();
      closeAddModal();
    }
  };

  // Prevent the modal from closing when clicking inside the modal
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click event from propagating to the overlay
  };

  // Helper function to format date in "dd mmm yyyy" format
  const formatDate = (dateString: string) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    if (!dateString) {
      return ""; // Return an empty string if no date is provided
    }

    const [year, month, day] = dateString.split("-");

    if (!year || !month || !day) {
      return ""; // Return an empty string if date is invalid
    }

    const monthName = months[parseInt(month, 10) - 1];
    return `${parseInt(day, 10)} ${monthName} ${year}`;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-200  overflow-hidden">
      {/* Page Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Despesas</h1>
          <button className="btn btn-primary" onClick={openAddModal}>
            + Adicionar
          </button>
        </div>

        {/* Expenses List */}
        <div className="space-y-4">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="p-4 bg-gray-800 rounded-lg flex justify-between items-center cursor-pointer"
              onClick={() => openModal(expense)}
            >
              <div>
                <p className="font-medium">{expense.title}</p>
                <p className="text-sm text-gray-400">
                  {expense.category} • {formatDate(expense.date)}
                  {/* Format the date */}
                </p>
              </div>
              <p className="font-semibold text-red-400">${expense.amount}</p>
            </div>
          ))}
        </div>
      </div>

      {/* View Details Modal */}
      {modalOpen && selectedExpense && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overlay"
          onClick={handleOverlayClick}
        >
          <div
            className="p-6 bg-gray-800 rounded-lg max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">{selectedExpense.title}</h2>
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {selectedExpense.category}
            </p>
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {formatDate(selectedExpense.date)} {/* Format the date */}
            </p>
            <p>
              <span className="font-semibold">Amount:</span>{" "}
              <span
                className={
                  selectedExpense.amount > 0 ? "text-green-400" : "text-red-400"
                }
              >
                ${selectedExpense.amount}
              </span>
            </p>
            <div className="mt-4 flex justify-between items-center">
              <button
                className="text-gray-400 underline hover:text-gray-200 text-sm"
                onClick={closeModal}
              >
                Fechar
              </button>
              <div className="space-x-2">
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => alert("Edit!")}
                >
                  Editar
                </button>
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => handleDelete(selectedExpense.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add New Expense Modal */}
      {addModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overlay"
          onClick={handleOverlayClick}
        >
          <div
            className="p-6 bg-gray-800 rounded-lg max-w-sm w-full"
            onClick={handleModalClick}
          >
            <h2 className="text-xl font-bold mb-4">Adicionar despesa</h2>
            <form className="space-y-4">
              <input
                type="date"
                className="input input-bordered w-full bg-gray-700 text-gray-200"
                value={newExpense.date}
                onChange={(e) => {
                  setNewExpense({ ...newExpense, date: e.target.value });
                }}
              />
              <input
                type="text"
                placeholder="Título"
                className="input input-bordered w-full bg-gray-700 text-gray-200"
                value={newExpense.title}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, title: e.target.value })
                }
              />
              <select
                className="select select-bordered w-full bg-gray-700 text-gray-200"
                value={newExpense.category}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, category: e.target.value })
                }
              >
                <option disabled defaultValue="" value="">
                  Selecionar categoria
                </option>
                <option value="mercado">Mercado</option>
                <option value="restaurante-delivery">
                  Restaurante/Delivery
                </option>
              </select>

              <select
                className="select select-bordered w-full bg-gray-700 text-gray-200"
                value={newExpense.expense_type}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, expense_type: e.target.value })
                }
              >
                <option disabled defaultValue="fixa" value="">
                  Selecionar tipo de despesa
                </option>
                <option value="fixa">Fixa</option>
                <option value="variavel">Variável</option>
              </select>

              <select
                className="select select-bordered w-full bg-gray-700 text-gray-200"
                value={newExpense.status}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, status: e.target.value })
                }
              >
                <option disabled defaultValue="realizado" value="">
                  Selecionar status
                </option>
                <option value="realizado">Realizado</option>
                <option value="orcado">Orçado</option>
              </select>
              <div className="flex flex-row items-center">
                <label className="text-md text-gray-400 w-[30%]">Valor:</label>
                <input
                  type="number"
                  placeholder="Valor"
                  className="input input-bordered w-full bg-gray-700 text-gray-200"
                  value={newExpense.amount || ""}
                  onChange={(e) =>
                    setNewExpense({
                      ...newExpense,
                      amount: e.target.value ? parseFloat(e.target.value) : 0, // Ensure a valid number is set
                    })
                  }
                />
              </div>
              <div className="flex flex-row items-center">
                <label className="text-md text-gray-400 w-[30%]">
                  Parcelas:
                </label>
                <input
                  type="number"
                  placeholder="Parcelas"
                  className="input input-bordered w-full bg-gray-700 text-gray-200"
                  value={newExpense.installments || ""}
                  onChange={(e) =>
                    setNewExpense({
                      ...newExpense,
                      installments: e.target.value
                        ? parseFloat(e.target.value)
                        : 1,
                    })
                  }
                />
              </div>
              <select
                className="select select-bordered w-full bg-gray-700 text-gray-200"
                value={newExpense.bank}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, bank: e.target.value })
                }
              >
                <option disabled defaultValue="nubank" value="">
                  Selecionar banco
                </option>
                <option value="nubank">Nubank</option>
                <option value="picpay">PicPay</option>
                <option value="rico">Rico</option>
              </select>
              <select
                className="select select-bordered w-full bg-gray-700 text-gray-200"
                value={newExpense.payment_type}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, payment_type: e.target.value })
                }
              >
                <option disabled defaultValue="credito" value="">
                  Selecionar tipo de pagamento
                </option>
                <option value="cartao-credito">Cartão de crédito</option>
                <option value="pix">Pix</option>
                <option value="dinheiro">Dinheiro</option>
                <option value="cartao-debito">Cartão de débito</option>
              </select>
              <input
                type="text"
                placeholder="Comentários"
                className="input input-bordered w-full bg-gray-700 text-gray-200"
                value={newExpense.comments}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, comments: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Tags"
                className="input input-bordered w-full bg-gray-700 text-gray-200"
                value={newExpense.tags}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, tags: e.target.value })
                }
              />

              <button
                type="button"
                className="btn btn-primary w-full"
                onClick={saveNewExpense}
              >
                Salvar
              </button>
            </form>
            <div className="mt-4 flex justify-between">
              <button
                className="text-gray-400 underline hover:text-gray-200 text-sm"
                onClick={closeAddModal}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpensesPage;
