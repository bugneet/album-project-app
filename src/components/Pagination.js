import React from 'react';

class Pagination extends React.Component {
    render() {
        const { currentPage, totalPages, onPageChange } = this.props;
        const pageNumbers = [];
        const visiblePageRange = 5; // 페이지 번호로 표시할 범위
        const halfRange = Math.floor(visiblePageRange / 2);

        // 현재 페이지를 중심으로 좌우에 visiblePageRange 범위 내의 페이지 번호를 계산
        let startPage = currentPage - halfRange;
        if (startPage < 1) {
            startPage = 1;
        }
        let endPage = startPage + visiblePageRange - 1;
        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - visiblePageRange + 1);
        } else if (endPage - startPage < visiblePageRange - 1) {
            startPage = Math.max(1, endPage - visiblePageRange + 1);
        }



        // 페이지 번호 배열 생성
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        // '...' 추가
        if (endPage < totalPages) {
            pageNumbers.push('...');
        }
        // 마지막 페이지를 먼저 추가
        if (endPage < totalPages) {
            pageNumbers.push(totalPages);
        }

        return (
            <ul className="pagination">
                <li>
                    <button onClick={() => onPageChange(1)}>처음</button>
                </li>
                {currentPage > 1 && (
                    <li>
                        <button onClick={() => onPageChange(currentPage - 1)}>이전</button>
                    </li>
                )}

                {pageNumbers.map((number, index) => (
                    <li key={index} className={currentPage === number ? 'active' : null}>
                        {typeof number === 'number' ? (
                            <button onClick={() => onPageChange(number)}>
                                {number}
                            </button>
                        ) : (
                            <span>{number}</span>
                        )}
                    </li>
                ))}
                {currentPage < totalPages && (
                    <li>
                        <button onClick={() => onPageChange(currentPage + 1)}>다음</button>
                    </li>
                )}
                <li>
                    <button onClick={() => onPageChange(totalPages)}>마지막</button>
                </li>
            </ul>
        );
    }
}

export default Pagination;