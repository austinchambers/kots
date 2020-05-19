import React from "react";
import Modal from "react-modal";
import moment from "moment";

export default function DeleteRedactorSpec(props) {
  const { deleteRedactorSpecModal, toggleConfirmDeleteModal, redactorToDelete, handleDeleteRedactor, deleteErr, deleteErrorMsg } = props;

  return (
    <Modal
      isOpen={deleteRedactorSpecModal}
      shouldReturnFocusAfterClose={false}
      onRequestClose={() => { toggleConfirmDeleteModal({}); }}
      ariaHideApp={false}
      contentLabel="Modal"
      className="Modal DefaultSize"
    >
      <div className="Modal-body">
        <div className="flex flex-column">
          <p className="u-fontSize--largest u-fontWeight--bold u-color--tuna u-lineHeight--normal u-marginBottom--more">
            Delete redactor
              </p>
          {deleteErr ?
            <p className="u-color--chestnut u-fontSize--small u-fontWeight--medium u-lineHeight--normal">{deleteErrorMsg}</p>
            : null}
          <p className="u-fontSize--normal u-fontWeight--normal u-color--dustyGray u-lineHeight--normal">
            Are you sure you want to delete a redactor? This action cannot be reversed.
              </p>
          <div className="flex flex1 justifyContent--spaceBetween u-marginTop--20">
            <div className="flex flex-column">
              <p className="u-fontSize--normal u-fontWeight--bold u-color--tuna u-lineHeight--normal">{redactorToDelete?.name}</p>
              <p className="u-fontSize--normal u-color--doveGray u-fontWeight--bold u-lineHeight--normal u-marginRight--20">Last updated on {moment(redactorToDelete?.updatedOn).format("MM/DD/YY @ hh:mm a")}</p>
            </div>
          </div>
          <div className="flex justifyContent--flexStart u-marginTop--20">
            <button
              className="btn secondary blue u-marginRight--10"
              onClick={() => { toggleConfirmDeleteModal({}); }}
            >
              Cancel
                </button>
            <button
              className="btn primary red"
              onClick={() => { handleDeleteRedactor(redactorToDelete) }}
            >
              Delete redactor
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}