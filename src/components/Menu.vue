<script lang="ts">
export default {
    name: "Menu"
}
</script>
<template>
    <div class="menu_wrapper">
        <!-- Menu -->
        <div class="menu">
            <h1>Menu</h1>

            <h3>Pizza</h3>
            <table>
                <tbody>
                    <tr>
                        <td><strong>~Pepperoni~</strong></td>
                    </tr>
                    <tr>
                        <td>
                            <small>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam porro magni dicta
                                debitis. Vel in reiciendis officiis dolorum quas, corporis vero ab voluptates laborum
                                unde nulla, eum possimus, provident a?
                            </small>
                        </td>
                    </tr>
                    <tr>
                        <td>9"</td>
                        <td>$6.95</td>
                        <td><button type="button" class="btn_green">+</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
h3 {
    text-align: center;
}

.menu_wrapper {
    display: flex;
    flex-direction: column;

}

.menu {
    background-color: #f1e6ea;
    border-radius: 3px;
    height: 100vh;
    margin: 10px;
    padding: 10px;
}

@media screen and (min-width: 900px) {
    .menu_wrapper {
        flex-direction: row;
        justify-content: space-between;
    }

    .menu {
        width: 65vw;
    }
}

table {
    color: black;
}
</style>