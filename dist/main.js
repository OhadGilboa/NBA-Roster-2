class Team {

    renderPlayers(data) {
        $(`#playersData`).empty()
        const source = $('#players-template').html();
        const template = Handlebars.compile(source);
        const newHTML = template({ data });
        $(`#playersData`).append(newHTML)
    }

    bringData() {
        let input = $(`#inputTeam`).val()
        $.get(`/teams/${input}`, (teamData) => {
            this.renderPlayers(teamData)
        })
    }

}

let team = new Team()

$(`#buttonFindTeam`).on(`click`, function () {
    team.bringData()
})

//Dream Team

$(`#getDreamteam`).on(`click`, function () {
    $.get(`/dreamTeam`, function (dreamData) {
        team.renderPlayers(dreamData)
    })
})

$(`#playersData`).on(`click`, `.dreamTeam`, function () {
    let playerData = {
        firstName: $(this).siblings()[0].textContent,
        lastName: $(this).siblings()[1].textContent,
        jersey: $(this).siblings()[2].textContent,
        pos: $(this).siblings()[3].textContent,
        img: $(this).siblings()[4].src
    }

    $.post(`/roster`, playerData, function () {})
})

