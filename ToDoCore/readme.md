# Models
This contain the models of the task
<div style="display:flex; flex-direction:column; justify-content:center;align-items:center">
    <table>
        <caption><b>Task</b></caption>
        <tr>
            <th>Name</th>
            <th>Attribute</th>
        </tr>
        <tr>
            <td>content</td>
            <td>Char (max = 150)</td>
        </tr>
        <tr>
            <td>check</td>
            <td>Boolean</td>
        </tr>
        <!-- <tr>
            <td>subtask</td>
            <td>Many to Many (Ralation with subtask)</td>
        </tr> -->
    </table>
    <!-- |<br/>|<br/>|<br/>
    <table>
        <caption><b>Subtask</b> (Child of Task)</caption>
        <description></description>
        <tr>
            <th>Name</th>
            <th>Attribute</th>
        </tr>
        <tr>
            <td>content</td>
            <td>Char (max = 150)</td>
        </tr>
        <tr>
            <td>check</td>
            <td>Boolean</td>
        </tr>
    </table> -->
    |<br/>|<br/>|<br/>
    <table>
        <caption><b>Board</b></caption>
        <tr>
            <th>Name</th>
            <th>Attribute</th>
        </tr>
        <tr>
            <td>task</td>
            <td>Many to Many (Ralation with Task)</td>
        </tr>
        <tr>
            <td>description</td>
            <td>Text</td>
        </tr>
        <tr>
            <td>date_created</td>
            <td>DateTime</td>
        </tr>
    </table>
</div>

